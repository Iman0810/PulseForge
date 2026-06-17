package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/disk"
	"github.com/shirou/gopsutil/v3/mem"
)
type Metric struct {

	DeviceName string `json:"deviceName"`

	CPUUsage float64 `json:"cpuUsage"`

	RAMUsage float64 `json:"ramUsage"`

	DiskUsage float64 `json:"diskUsage"`
}

func collectMetrics() Metric {


	hostname, err := os.Hostname()

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

		DeviceName: hostname,

		CPUUsage: cpuUsage[0],

		RAMUsage: memory.UsedPercent,

		DiskUsage: diskInfo.UsedPercent,
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

func sendMetrics(metric Metric){

	data,_ := json.Marshal(metric)

	_, err := http.Post(
		"http://localhost:8080/api/metrics",
		"application/json",
		bytes.NewBuffer(data),
	)

	if err != nil {

		fmt.Println("Failed to send metrics:", err)
		return
	}

	fmt.Println("Metrics sent successfully" , metric)

	
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

