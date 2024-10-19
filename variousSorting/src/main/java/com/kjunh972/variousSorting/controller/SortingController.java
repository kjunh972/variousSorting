package com.kjunh972.variousSorting.controller;

import com.kjunh972.variousSorting.DTO.SortingStep;
import com.kjunh972.variousSorting.service.SortingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/api/sorting")
public class SortingController {

    @Autowired
    private SortingService sortingService;

    @PostMapping("/{algorithm}")
    public ResponseEntity<?> sort(@PathVariable String algorithm, @RequestBody List<Integer> numbers) {
        try {
            algorithm = URLDecoder.decode(algorithm, StandardCharsets.UTF_8.toString());
            System.out.println("Received request for algorithm: " + algorithm);
            System.out.println("Numbers to sort: " + numbers);
            List<SortingStep> steps = sortingService.sort(algorithm, numbers);
            return ResponseEntity.ok(steps);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error occurred while sorting: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred: " + e.getMessage());
        }
    }
}