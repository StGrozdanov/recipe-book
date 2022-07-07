package recepiesserver.recipesserver.services;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
        } catch (IOException e) {
            e.printStackTrace();
        }
        //TODO: THROW EXCEPTION
        return null;
    }

    public String deleteFile(String filename) {
        this.amazonS3.deleteObject(bucketName, filename);
        return String.format("File %s deleted.", filename);
    }

    private File convertMultipartFileToFile(MultipartFile multipartFile) throws IOException {
        File convertedFile = new File(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        FileOutputStream fileOutputStream = new FileOutputStream(convertedFile);
        fileOutputStream.write(multipartFile.getBytes());
        fileOutputStream.close();
        return convertedFile;
    }
}
