package recepiesserver.recipesserver.services;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import recepiesserver.recipesserver.exceptions.imageExceptions.InvalidFormatException;
import recepiesserver.recipesserver.exceptions.imageExceptions.UnsuccessfulAmazonOperationException;
import recepiesserver.recipesserver.utils.constants.ExceptionMessages;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.Objects;

@Service
public class AmazonS3Service {
    private final AmazonS3 amazonS3;
    @Value("${amazon.s3.default-bucket}")
    private String bucketName;

    public AmazonS3Service(AmazonS3 amazonS3) {
        this.amazonS3 = amazonS3;
    }

    public String uploadFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        try {
            File fileToUpload = this.convertMultipartFileToFile(file);

            this.amazonS3.putObject(bucketName, fileName, fileToUpload);
            this.amazonS3.setObjectAcl(bucketName, fileName, CannedAccessControlList.PublicRead);

            URL url = this.amazonS3.getUrl(bucketName, fileName);

            return url.toExternalForm();
        } catch (SdkClientException e) {
            throw new UnsuccessfulAmazonOperationException(e.getMessage());
        } catch (IOException e) {
            throw new InvalidFormatException(ExceptionMessages.INVALID_FILE_FORMAT);
        }
    }

    public void deleteFile(String fileAddress) {
        String fileName = fileAddress
                .replace("https://cook-book-shushanite.s3.eu-central-1.amazonaws.com/", "");
        try {
            this.amazonS3.deleteObject(bucketName, fileName);
        } catch (SdkClientException e) {
            throw new UnsuccessfulAmazonOperationException(e.getMessage());
        }
    }

    private File convertMultipartFileToFile(MultipartFile multipartFile) throws IOException {
        File convertedFile = new File(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        FileOutputStream fileOutputStream = new FileOutputStream(convertedFile);
        fileOutputStream.write(multipartFile.getBytes());
        fileOutputStream.close();
        return convertedFile;
    }
}
