package com.example.posturepro.api.s3.service;

import java.net.URL;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

@Service
public class S3Service {

	private final S3Presigner presigner;

	@Value("${cloud.aws.s3.video-bucket}")
	private String videoBucket;

	@Value("${cloud.aws.s3.profileimg-bucket}")
	private String profileImgBucket;

	public S3Service(S3Presigner presigner) {
		this.presigner = presigner;
	}

	public Map<String, String> generatePreSignedUrl(String videoFileName, String profileImgFileName) {
		Map<String, String> urls = new HashMap<>();

		// 영상용 url 생성
		if(videoFileName != null && !videoFileName.isEmpty()) {
			String videoKey = "uploads/video/" + UUID.randomUUID() + "_" + videoFileName;
			URL videoPreSignedUrl = presigner.presignPutObject(PutObjectPresignRequest.builder()
				.signatureDuration(Duration.ofMinutes(10))
				.putObjectRequest(req -> req.bucket(videoBucket).key(videoKey).contentType("video/mp4"))
				.build()).url();

			urls.put("videoPreSignedUrl", videoPreSignedUrl.toString());
			urls.put("videoKey", videoKey);
		}

		// 프로필 이미지용 url 생성
		if(profileImgFileName != null && !profileImgFileName.isEmpty()) {
			String profileImgKey = "uploads/profileImg/" + UUID.randomUUID() + "_" + profileImgFileName;
			URL profileImgPreSignedUrl = presigner.presignPutObject(PutObjectPresignRequest.builder()
				.signatureDuration(Duration.ofMinutes(10))
				.putObjectRequest(req -> req.bucket(profileImgBucket).key(profileImgKey).contentType("image/jpeg"))
				.build()).url();

			urls.put("profileImgPreSignedUrl", profileImgPreSignedUrl.toString());
			urls.put("profileImgKey", profileImgKey);
		}

		return urls;
	}
}
