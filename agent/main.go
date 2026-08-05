package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"
	"runtime"


	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/disk"
	"github.com/shirou/gopsutil/v3/mem"
	"github.com/google/uuid"
	"github.com/shirou/gopsutil/v3/host"
)
type Agent struct {
	AgentID string `json:"agentId"`
}
type Metric struct {

	Agent Agent `json:"agent"`

	DeviceName string `json:"deviceName"`

	CPUUsage float64 `json:"cpuUsage"`

	RAMUsage float64 `json:"ramUsage"`

	DiskUsage float64 `json:"diskUsage"`

	LastSeen string `json:"lastSeen"`

	OS string `json:"os"`

	Architecture string `json:"architecture"`

    Kernel string `json:"kernel"`

    Uptime uint64 `json:"uptime"`	
}

func collectMetrics() Metric {


	hostname, err := os.Hostname()

	hostInfo, _ := host.Info()

	if err != nil {

		hostname = "unknown"

	}


	cpuUsage, _ := cpu.Percent(
		time.Second,
		false,
	)


	memory, _ := mem.VirtualMemory()


	diskInfo, _ := disk.Usage("/")


	return Metric{

		Agent: Agent{AgentID: getAgentID()},

		DeviceName: hostname,

		CPUUsage: cpuUsage[0],

		RAMUsage: memory.UsedPercent,

		DiskUsage: diskInfo.UsedPercent,
		
		LastSeen: time.Now().Format(time.RFC3339),
		OS: runtime.GOOS,

		Architecture: runtime.GOARCH,

		Kernel: hostInfo.KernelVersion,

		Uptime: hostInfo.Uptime,
	}

}

func validateMetric(metric Metric) bool {


	if metric.CPUUsage < 0 || metric.CPUUsage > 100 {
		return false
	}


	if metric.RAMUsage < 0 || metric.RAMUsage > 100 {
		return false
	}


	if metric.DiskUsage < 0 || metric.DiskUsage > 100 {
		return false
	}


	return true
}

func sendMetrics(metric Metric) {

    data, _ := json.Marshal(metric)

    resp, err := http.Post(
        "http://localhost:8080/api/metrics",
        "application/json",
        bytes.NewBuffer(data),
    )

    if err != nil {
        fmt.Println("Failed to send metrics:", err)
        return
    }

    defer resp.Body.Close()

    fmt.Println("HTTP Status:", resp.Status)

    fmt.Println("Metrics sent:", metric)
}

func getAgentID() string {


	data, err := os.ReadFile("agent-id.txt")


	if err == nil {

		return string(data)

	}


	id := uuid.New().String()


	os.WriteFile(
		"agent-id.txt",
		[]byte(id),
		0644,
	)


	return id

}

func main() {

	fmt.Println("OpenMonitor Agent Started",)

	for {
		metric := collectMetrics()

		if validateMetric(metric){
			sendMetrics(metric)
		}else{
			fmt.Println("Invalid metric data:", metric)
		}

		time.Sleep( 5 * time.Second,)
	}
}

