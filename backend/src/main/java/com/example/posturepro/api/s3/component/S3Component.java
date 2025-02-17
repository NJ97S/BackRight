package com.example.posturepro.api.s3.component;

import java.net.URL;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

@Component
public class S3Component {

	private final S3Presigner presigner;

	@Value("${cloud.aws.s3.video-bucket}")
	private String videoBucket;

	@Value("${cloud.aws.s3.profileimg-bucket}")
	private String profileImgBucket;

	public S3Component(S3Presigner presigner) {
		this.presigner = presigner;
	}

	public Map<String, String> generatePreSignedUrls(String providerId, String videoFileName,
		String profileImgFileName) {
		Map<String, String> urls = new HashMap<>();

		if (videoFileName != null && !videoFileName.isEmpty()) {
			String videoKey = "uploads/" + providerId + "/videos/" + videoFileName + ".webm";
			URL videoPreSignedUrl = presigner.presignPutObject(PutObjectPresignRequest.builder()
				.signatureDuration(Duration.ofMinutes(10))
				.putObjectRequest(req -> req.bucket(videoBucket).key(videoKey).contentType("video/webm"))
				.build()).url();

			urls.put("videoPreSignedUrl", videoPreSignedUrl.toString());
			urls.put("videoUrl", videoKey);
		}

		if (profileImgFileName != null && !profileImgFileName.isEmpty()) {
			String profileImgKey = "uploads/" + providerId + "/profile/" + profileImgFileName;
			URL profileImgPreSignedUrl = presigner.presignPutObject(PutObjectPresignRequest.builder()
				.signatureDuration(Duration.ofMinutes(10))
				.putObjectRequest(req -> req.bucket(profileImgBucket).key(profileImgKey).contentType("image/jpeg"))
				.build()).url();

			urls.put("profileImgPreSignedUrl", profileImgPreSignedUrl.toString());
			urls.put("profileImgKey", profileImgKey);
		}

		return urls;
	}

	public String generatePreSignedUrlForProfileImageUpdate(String profileImgKey) {
		URL profileImgPreSignedUrl = presigner.presignPutObject(PutObjectPresignRequest.builder()
			.signatureDuration(Duration.ofMinutes(10))
			.putObjectRequest(req -> req.bucket(profileImgBucket)
				.key(profileImgKey)
				.contentType("image/jpeg"))
			.build()).url();

		return profileImgPreSignedUrl.toString();
	}

	public String generatePreSignedGetUrl(String videoUrl) {
		URL preSignedUrl = presigner.presignGetObject(GetObjectPresignRequest.builder()
			.signatureDuration(Duration.ofMinutes(10))
			.getObjectRequest(GetObjectRequest.builder()
				.bucket(videoBucket)
				.key(videoUrl)
				.build())
			.build()).url();

		return preSignedUrl.toString();
	}
}
