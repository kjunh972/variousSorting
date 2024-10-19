package com.kjunh972.variousSorting.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

/** 정렬 알고리즘의 설명과 정렬 과정의 각 단계를 나타내는 DTO 클래스 */
@Data
@NoArgsConstructor
public class SortingStep {
    /** 정렬 알고리즘의 이름 */
    private String name;

    /** 정렬 알고리즘의 설명 */
    private String description;

    /** 정렬 알고리즘의 단계별 설명 */
    private List<String> steps;

    /** 정렬 알고리즘의 시간 복잡도 */
    private String timeComplexity;

    /** 정렬 알고리즘의 공간 복잡도 */
    private String spaceComplexity;

    /** 정렬 알고리즘의 안정성 여부 */
    private String stability;

    /** 현재 정렬 단계의 숫자 목록 */
    private List<Integer> numbers;

    /** 현재 정렬 단계에 대한 설명 */
    private String stepDescription;

    /** 현재 정렬 단계의 변수 값 */
    private Map<String, Integer> variables;

    /** 현재 정렬 단계의 활성 인덱스 */
    private List<Integer> activeIndices;

    // 정렬 단계를 위한 생성자
    public SortingStep(List<Integer> numbers, String stepDescription, Map<String, Integer> variables, List<Integer> activeIndices) {
        this.numbers = numbers;
        this.stepDescription = stepDescription;
        this.variables = variables;
        this.activeIndices = activeIndices;
    }
}