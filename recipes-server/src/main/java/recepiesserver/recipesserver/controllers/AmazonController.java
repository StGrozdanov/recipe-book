package recepiesserver.recipesserver.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import recepiesserver.recipesserver.services.AmazonS3Service;

@RestController
public class AmazonController {
    private final AmazonS3Service amazonS3Service;

    public AmazonController(AmazonS3Service amazonS3Service) {
        this.amazonS3Service = amazonS3Service;
    }

    @PostMapping("/amazon")
    public ResponseEntity<String> uploadToAmazon(@RequestParam("file") MultipartFile file) {
        return new ResponseEntity<>(amazonS3Service.uploadFile(file), HttpStatus.OK);
    }

    @DeleteMapping("/amazon/{fileName}")
    public ResponseEntity<String> deleteAmazonFile(@PathVariable String fileName) {
        return new ResponseEntity<>(amazonS3Service.deleteFile(fileName), HttpStatus.OK);
    }
}