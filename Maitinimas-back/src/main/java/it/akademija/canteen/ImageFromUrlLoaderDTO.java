package it.akademija.canteen;

import java.util.Arrays;

public class ImageFromUrlLoaderDTO {

	private byte[] image;
	
	private int fileSize;
	
	private String contentType;
	
	private String fileExtension;
	
	public ImageFromUrlLoaderDTO() {}

	public ImageFromUrlLoaderDTO(byte[] image, int fileSize, String contentType, String fileExtension) {
		super();
		this.image = image;
		this.fileSize = fileSize;
		this.contentType = contentType;
		this.fileExtension = fileExtension;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public int getFileSize() {
		return fileSize;
	}

	public void setFileSize(int fileSize) {
		this.fileSize = fileSize;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public String getFileExtension() {
		return fileExtension;
	}

	public void setFileExtension(String fileExtension) {
		this.fileExtension = fileExtension;
	}

	@Override
	public String toString() {
		return "ImageFromUrlLoaderDTO [image=" + Arrays.toString(image) + ", fileSize=" + fileSize + ", contentType="
				+ contentType + ", fileExtension=" + fileExtension + "]";
	}
}
