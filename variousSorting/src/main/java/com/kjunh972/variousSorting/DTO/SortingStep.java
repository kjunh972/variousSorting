package com.kjunh972.variousSorting.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/** 정렬 과정의 각 단계를 나타내는 DTO 클래스로, 현재 숫자 목록과 단계 설명을 포함 */
@Data // getter, setter, toString, equals, hashCode 메서드 자동 생성
@NoArgsConstructor // 매개변수 없는 기본 생성자 생성
@AllArgsConstructor // 모든 필드를 매개변수로 받는 생성자 생성
public class SortingStep {
    /** 현재 정렬 단계의 숫자 목록 */
    private List<Integer> numbers;
    /** 현재 정렬 단계에 대한 설명 */
    private String description;
}