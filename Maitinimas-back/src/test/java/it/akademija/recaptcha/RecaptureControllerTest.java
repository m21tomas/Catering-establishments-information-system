package it.akademija.recaptcha;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
class RecaptureControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ValidateCaptcha validateCaptcha;

    @Test
    void whenValidCaptcha_thenReturnTrue() throws Exception {
        // Mocking the service call
        Mockito.when(validateCaptcha.validateCaptcha(Mockito.anyString())).thenReturn(true);

        RecaptchaDTO dto = new RecaptchaDTO("testCaptchaResponse");

        mockMvc.perform(post("/api/verify")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(content().string("true")); // Expecting true for valid captcha
    }

    @Test
    void whenInvalidCaptcha_thenReturnFalse() throws Exception {
        // Mocking the service call
        Mockito.when(validateCaptcha.validateCaptcha(Mockito.anyString())).thenReturn(false);

        RecaptchaDTO dto = new RecaptchaDTO("invalidCaptchaResponse");

        mockMvc.perform(post("/api/verify")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(content().string("false")); // Expecting false for invalid captcha
    }
}

