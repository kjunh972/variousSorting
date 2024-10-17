package com.kjunh972.variousSorting.controller;

import com.kjunh972.variousSorting.service.SortingService;
import com.kjunh972.variousSorting.DTO.SortingStep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sorting")
public class SortingController {

    @Autowired
    private SortingService sortingService;

    @PostMapping("/{algorithm}")
    public List<SortingStep> sort(@PathVariable String algorithm, @RequestBody List<Integer> numbers) {
        return sortingService.sort(algorithm, numbers);
    }
}