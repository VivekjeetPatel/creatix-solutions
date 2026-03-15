import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class TestHash {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
        System.out.println(encoder.matches("Admin@123", "$2a$12$LIlnYUVIIoVbSXbTpawcDeTD8JZ0Y9yGb62a0IHSMLKViqfYnqiKG"));
    }
}
