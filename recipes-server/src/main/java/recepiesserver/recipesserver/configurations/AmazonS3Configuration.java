package recepiesserver.recipesserver.configurations;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AmazonS3Configuration {
    @Value("${amazon.aws.access-key}")
    private String accessKey;
    @Value("${amazon.aws.secret-key}")
    private String secret;
    @Value("${amazon.aws.region}")
    private String region;

    @Bean
    public AmazonS3 amazonS3() {
        AWSCredentials awsCredentials = new BasicAWSCredentials(accessKey, secret);

        return AmazonS3ClientBuilder
                                .standard()
                                .withRegion(region)
                                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                                .build();
    }
}