package backend.security;

import java.util.Map;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;
import org.springframework.stereotype.Component;

import backend.service.JwtService;

@Component
public class JwtHandshakeInterceptor implements HandshakeInterceptor {

    private final JwtService jwtService;

    public JwtHandshakeInterceptor(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public boolean beforeHandshake(
            ServerHttpRequest request,
            ServerHttpResponse response,
            WebSocketHandler wsHandler,
            Map<String, Object> attributes
    ) {

        String query = request.getURI().getQuery();

        if (query == null) {
            return false;
        }

        String token = null;

        for (String parameter : query.split("&")) {

            String[] parts = parameter.split("=", 2);

            if (parts.length == 2 &&
                    parts[0].equals("token")) {

                token = parts[1];
                break;
            }
        }

        if (token == null || token.isBlank()) {
            return false;
        }

        try {

            String username =
                    jwtService.extractUsername(token);

            if (username == null) {
                return false;
            }

            attributes.put("username", username);

            return true;

        } catch (Exception e) {

            return false;
        }
    }

    @Override
    public void afterHandshake(
            ServerHttpRequest request,
            ServerHttpResponse response,
            WebSocketHandler wsHandler,
            Exception exception
    ) {
        // Nothing required here
    }
}