package recepiesserver.recipesserver.services;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;

import java.io.UnsupportedEncodingException;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.multipart.MultipartFile;
import recepiesserver.recipesserver.exceptions.imageExceptions.UnsuccessfulAmazonOperationException;

@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@ContextConfiguration(classes = {AmazonS3Service.class})
@ExtendWith(SpringExtension.class)
class AmazonS3ServiceTest {
    @MockBean
    private AmazonS3 amazonS3;

    @Autowired
    private AmazonS3Service amazonS3Service;

    @Test
    void testDeleteFile() throws SdkClientException {
        doNothing().when(amazonS3).deleteObject((String) any(), (String) any());
        amazonS3Service.deleteFile("42 Main St");
        verify(amazonS3).deleteObject((String) any(), (String) any());
    }

    @Test
    void testDeleteFileThrowsException() throws SdkClientException {
        doThrow(new SdkClientException("An error occurred")).when(amazonS3).deleteObject((String) any(), (String) any());
        assertThrows(UnsuccessfulAmazonOperationException.class, () -> amazonS3Service.deleteFile("42 Main St"));
        verify(amazonS3).deleteObject((String) any(), (String) any());
    }
}

