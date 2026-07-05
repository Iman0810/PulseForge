package backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final MetricWebSocketHandler metricWebSocketHandler;

    public WebSocketConfig(MetricWebSocketHandler metricWebSocketHandler) {
        this.metricWebSocketHandler = metricWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {

        registry.addHandler(metricWebSocketHandler, "/ws")
                .setAllowedOriginPatterns("*");
    }
}