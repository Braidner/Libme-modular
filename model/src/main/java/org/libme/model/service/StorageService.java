package org.libme.model.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.InputStream;

/**
 * Created by Braidner
 */
@Service
public class StorageService {

    @Autowired
    private AmazonS3Client amazonS3Client;

    private PutObjectRequest createUploadRequest(String bucket, String key, InputStream file) {
        return new PutObjectRequest(bucket, key, file, new ObjectMetadata())
                .withCannedAcl(CannedAccessControlList.PublicRead);
    }

    public boolean upload(String bucket, String key, InputStream file) {
        PutObjectResult result = amazonS3Client.putObject(createUploadRequest(bucket, key, file));
        System.out.println(result);
        return true;
    }

    public InputStream download(String bucket, String key) {
        GetObjectRequest getObjectRequest = new GetObjectRequest(bucket, key);
        S3Object object = amazonS3Client.getObject(getObjectRequest);
        return object.getObjectContent();
    }

    public boolean delete(String bucket, String key) {
        DeleteObjectRequest deleteObjectRequest = new DeleteObjectRequest(bucket, key);
        amazonS3Client.deleteObject(deleteObjectRequest);
        return true;
    }
}
