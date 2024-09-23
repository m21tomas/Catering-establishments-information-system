package it.akademija.recaptcha;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CaptchaResponse {

	boolean success;
    LocalDateTime challenge_ts;
    String hostname;
    @JsonProperty("error-codes")
    List<String> errorCodes;
    
    public CaptchaResponse() {}
    
	public CaptchaResponse(boolean success, LocalDateTime challenge_ts, String hostname, List<String> errorCodes) {
		super();
		this.success = success;
		this.challenge_ts = challenge_ts;
		this.hostname = hostname;
		this.errorCodes = errorCodes;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public LocalDateTime getChallenge_ts() {
		return challenge_ts;
	}

	public void setChallenge_ts(LocalDateTime challenge_ts) {
		this.challenge_ts = challenge_ts;
	}

	public String getHostname() {
		return hostname;
	}

	public void setHostname(String hostname) {
		this.hostname = hostname;
	}

	public List<String> getErrorCodes() {
		return errorCodes;
	}

	public void setErrorCodes(List<String> errorCodes) {
		this.errorCodes = errorCodes;
	}

	@Override
	public int hashCode() {
		return Objects.hash(challenge_ts, errorCodes, hostname, success);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CaptchaResponse other = (CaptchaResponse) obj;
		return Objects.equals(challenge_ts, other.challenge_ts) && Objects.equals(errorCodes, other.errorCodes)
				&& Objects.equals(hostname, other.hostname) && success == other.success;
	}

	@Override
	public String toString() {
		return "CaptchaResponse [success=" + success + ", challenge_ts=" + challenge_ts + ", hostname=" + hostname
				+ ", errorCodes=" + errorCodes + "]";
	}
    
    
}
