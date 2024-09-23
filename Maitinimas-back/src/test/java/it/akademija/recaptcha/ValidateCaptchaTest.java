package it.akademija.recaptcha;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

// @MockitoSettings(strictness = Strictness.LENIENT)
@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class ValidateCaptchaTest {

	@Mock 
    private RestTemplate restTemplate;

	@Autowired
    private ValidateCaptcha validateCaptcha;
	
	@SuppressWarnings("deprecation")
	@BeforeEach   // replace with junit5 equivalent
	void setUp() {
	    MockitoAnnotations.initMocks(this);
	    validateCaptcha= new ValidateCaptcha (restTemplate, 
	    		"https://www.google.com/recaptcha/api/siteverify");
	}

    @Test
    public void testValidateCaptcha() {
        String captchaResponse = "test-captcha-response";
        
        CaptchaResponse mockResponse = new CaptchaResponse();
        mockResponse.setSuccess(true);  // Set success or failure based on your test scenario
        
        when(restTemplate.postForObject(
                anyString(),                       // Mock any URL (recaptchaEndpoint)
                any(MultiValueMap.class),          // Mock any request params
                eq(CaptchaResponse.class)          // Expect a response of type CaptchaResponse
        )).thenReturn(mockResponse);

        boolean result = validateCaptcha.validateCaptcha(captchaResponse);
        
     // Debug output to see what's happening
        System.out.println("Captcha API call result: " + result);
        
        assertTrue(result);  // or assertFalse depending on mockResponse success
    }
}
