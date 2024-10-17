package com.kjunh972.variousSorting.service;

import com.kjunh972.variousSorting.DTO.SortingStep;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.TreeSet;

@Service
public class SortingService {

    public List<SortingStep> sort(String algorithm, List<Integer> numbers) {
        switch (algorithm.toLowerCase()) {
            case "selection": return selectionSort(numbers);
            case "insertion": return insertionSort(numbers);
            case "bubble": return bubbleSort(numbers);
            case "merge": return mergeSort(numbers);
            case "heap": return heapSort(numbers);
            case "quick": return quickSort(numbers);
            case "tree": return treeSort(numbers);
            case "tim": return timSort(numbers);
            default: throw new IllegalArgumentException("Unknown sorting algorithm: " + algorithm);
        }
    }

    private List<SortingStep> selectionSort(List<Integer> numbers) {
        List<SortingStep> steps = new ArrayList<>();
        steps.add(new SortingStep(new ArrayList<>(numbers), "초기 상태: 메모리에 " + numbers + " 저장"));

        for (int i = 0; i < numbers.size() - 1; i++) {
            int minIdx = i;
            steps.add(new SortingStep(new ArrayList<>(numbers),
                    String.format("메모리 위치 %d부터 최솟값 탐색 시작", i)));

            for (int j = i + 1; j < numbers.size(); j++) {
                steps.add(new SortingStep(new ArrayList<>(numbers),
                        String.format("메모리 위치 %d의 값 %d와 위치 %d의 값 %d 비교",
                                minIdx, numbers.get(minIdx), j, numbers.get(j))));

                if (numbers.get(j) < numbers.get(minIdx)) {
                    minIdx = j;
                    steps.add(new SortingStep(new ArrayList<>(numbers),
                            String.format("새 최솟값 %d 발견 (메모리 위치 %d)",
                                    numbers.get(minIdx), minIdx)));
                }
            }

            if (minIdx != i) {
                int temp = numbers.get(minIdx);
                numbers.set(minIdx, numbers.get(i));
                numbers.set(i, temp);
                steps.add(new SortingStep(new ArrayList<>(numbers),
                        String.format("메모리 위치 %d의 값 %d와 위치 %d의 값 %d 교환",
                                i, numbers.get(i), minIdx, numbers.get(minIdx))));
            }
        }

        steps.add(new SortingStep(new ArrayList<>(numbers), "정렬 완료: " + numbers));
        return steps;
    }

    private List<SortingStep> insertionSort(List<Integer> numbers) {
        List<SortingStep> steps = new ArrayList<>();
        steps.add(new SortingStep(new ArrayList<>(numbers), "초기 상태: 메모리에 " + numbers + " 저장"));

        for (int i = 1; i < numbers.size(); i++) {
            int key = numbers.get(i);
            int j = i - 1;

            steps.add(new SortingStep(new ArrayList<>(numbers),
                    String.format("메모리 위치 %d의 값 %d를 정렬된 부분에 삽입 시작", i, key)));

            while (j >= 0 && numbers.get(j) > key) {
                numbers.set(j + 1, numbers.get(j));
                steps.add(new SortingStep(new ArrayList<>(numbers),
                        String.format("메모리 위치 %d의 값 %d를 위치 %d로 이동",
                                j, numbers.get(j + 1), j + 1)));
                j = j - 1;
            }
            numbers.set(j + 1, key);
            steps.add(new SortingStep(new ArrayList<>(numbers),
                    String.format("%d를 메모리 위치 %d에 삽입", key, j + 1)));
        }

        steps.add(new SortingStep(new ArrayList<>(numbers), "정렬 완료: " + numbers));
        return steps;
    }

    private List<SortingStep> bubbleSort(List<Integer> numbers) {
        List<SortingStep> steps = new ArrayList<>();
        steps.add(new SortingStep(new ArrayList<>(numbers), "초기 상태: 메모리에 " + numbers + " 저장"));

        for (int i = 0; i < numbers.size() - 1; i++) {
            for (int j = 0; j < numbers.size() - i - 1; j++) {
                steps.add(new SortingStep(new ArrayList<>(numbers),
                        String.format("메모리 위치 %d의 값 %d와 위치 %d의 값 %d 비교",
                                j, numbers.get(j), j + 1, numbers.get(j + 1))));

                if (numbers.get(j) > numbers.get(j + 1)) {
                    int temp = numbers.get(j);
                    numbers.set(j, numbers.get(j + 1));
                    numbers.set(j + 1, temp);
                    steps.add(new SortingStep(new ArrayList<>(numbers),
                            String.format("메모리 위치 %d의 값 %d와 위치 %d의 값 %d 교환",
                                    j, numbers.get(j), j + 1, numbers.get(j + 1))));
                }
            }
        }

        steps.add(new SortingStep(new ArrayList<>(numbers), "정렬 완료: " + numbers));
        return steps;
    }

    private List<SortingStep> mergeSort(List<Integer> numbers) {
        List<SortingStep> steps = new ArrayList<>();
        steps.add(new SortingStep(new ArrayList<>(numbers), "초기 상태: 메모리에 " + numbers + " 저장"));
        mergeSortHelper(numbers, 0, numbers.size() - 1, steps);
        return steps;
    }

    private void mergeSortHelper(List<Integer> numbers, int left, int right, List<SortingStep> steps) {
        if (left < right) {
            int mid = (left + right) / 2;
            steps.add(new SortingStep(new ArrayList<>(numbers),
                    String.format("메모리 위치 %d부터 %d까지 분할", left, right)));

            mergeSortHelper(numbers, left, mid, steps);
            mergeSortHelper(numbers, mid + 1, right, steps);
            merge(numbers, left, mid, right, steps);
        }
    }

    private void merge(List<Integer> numbers, int left, int mid, int right, List<SortingStep> steps) {
        List<Integer> leftList = new ArrayList<>(numbers.subList(left, mid + 1));
        List<Integer> rightList = new ArrayList<>(numbers.subList(mid + 1, right + 1));

        steps.add(new SortingStep(new ArrayList<>(numbers),
                String.format("메모리 위치 %d부터 %d까지 병합 시작", left, right)));

        int i = 0, j = 0, k = left;
        while (i < leftList.size() && j < rightList.size()) {
            if (leftList.get(i) <= rightList.get(j)) {
                numbers.set(k, leftList.get(i));
                steps.add(new SortingStep(new ArrayList<>(numbers),
                        String.format("왼쪽 리스트의 값 %d를 메모리 위치 %d에 저장", leftList.get(i), k)));
                i++;
            } else {
                numbers.set(k, rightList.get(j));
                steps.add(new SortingStep(new ArrayList<>(numbers),
                        String.format("오른쪽 리스트의 값 %d를 메모리 위치 %d에 저장", rightList.get(j), k)));
                j++;
            }
            k++;
        }

        while (i < leftList.size()) {
            numbers.set(k, leftList.get(i));
            steps.add(new SortingStep(new ArrayList<>(numbers),
                    String.format("왼쪽 리스트의 남은 값 %d를 메모리 위치 %d에 저장", leftList.get(i), k)));
            i++;
            k++;
        }

        while (j < rightList.size()) {
            numbers.set(k, rightList.get(j));
            steps.add(new SortingStep(new ArrayList<>(numbers),
                    String.format("오른쪽 리스트의 남은 값 %d를 메모리 위치 %d에 저장", rightList.get(j), k)));
            j++;
            k++;
        }
    }

    private List<SortingStep> heapSort(List<Integer> numbers) {
        List<SortingStep> steps = new ArrayList<>();
        steps.add(new SortingStep(new ArrayList<>(numbers), "초기 상태: 메모리에 " + numbers + " 저장"));

        int n = numbers.size();

        for (int i = n / 2 - 1; i >= 0; i--)
            heapify(numbers, n, i, steps);

        for (int i = n - 1; i > 0; i--) {
            int temp = numbers.get(0);
            numbers.set(0, numbers.get(i));
            numbers.set(i, temp);
            steps.add(new SortingStep(new ArrayList<>(numbers),
                    String.format("최대값 %d를 메모리 위치 %d로 이동", temp, i)));

            heapify(numbers, i, 0, steps);
        }

        steps.add(new SortingStep(new ArrayList<>(numbers), "정렬 완료: " + numbers));
        return steps;
    }

    private void heapify(List<Integer> numbers, int n, int i, List<SortingStep> steps) {
        int largest = i;
        int l = 2 * i + 1;
        int r = 2 * i + 2;

        if (l < n && numbers.get(l) > numbers.get(largest))
            largest = l;

        if (r < n && numbers.get(r) > numbers.get(largest))
            largest = r;

        if (largest != i) {
            int swap = numbers.get(i);
            numbers.set(i, numbers.get(largest));
            numbers.set(largest, swap);
            steps.add(new SortingStep(new ArrayList<>(numbers),
                    String.format("메모리 위치 %d의 값 %d와 위치 %d의 값 %d 교환 (힙 속성 유지)",
                            i, numbers.get(i), largest, numbers.get(largest))));

            heapify(numbers, n, largest, steps);
        }
    }

    private List<SortingStep> quickSort(List<Integer> numbers) {
        List<SortingStep> steps = new ArrayList<>();
        steps.add(new SortingStep(new ArrayList<>(numbers), "초기 상태: 메모리에 " + numbers + " 저장"));
        quickSortHelper(numbers, 0, numbers.size() - 1, steps);
        return steps;
    }

    private void quickSortHelper(List<Integer> numbers, int low, int high, List<SortingStep> steps) {
        if (low < high) {
            int pi = partition(numbers, low, high, steps);
            quickSortHelper(numbers, low, pi - 1, steps);
            quickSortHelper(numbers, pi + 1, high, steps);
        }
    }

    private int partition(List<Integer> numbers, int low, int high, List<SortingStep> steps) {
        int pivot = numbers.get(high);
        steps.add(new SortingStep(new ArrayList<>(numbers),
                String.format("피벗 선택: 메모리 위치 %d의 값 %d", high, pivot)));

        int i = (low - 1);
        for (int j = low; j < high; j++) {
            steps.add(new SortingStep(new ArrayList<>(numbers),
                    String.format("메모리 위치 %d의 값 %d와 피벗 %d 비교", j, numbers.get(j), pivot)));

            if (numbers.get(j) < pivot) {
                i++;
                int temp = numbers.get(i);
                numbers.set(i, numbers.get(j));
                numbers.set(j, temp);
                steps.add(new SortingStep(new ArrayList<>(numbers),
                        String.format("메모리 위치 %d의 값 %d와 위치 %d의 값 %d 교환",
                                i, numbers.get(i), j, numbers.get(j))));
            }
        }
        int temp = numbers.get(i + 1);
        numbers.set(i + 1, numbers.get(high));
        numbers.set(high, temp);
        steps.add(new SortingStep(new ArrayList<>(numbers),
                String.format("피벗 %d를 최종 위치 %d로 이동", pivot, i + 1)));
        return i + 1;
    }

    private List<SortingStep> treeSort(List<Integer> numbers) {
        List<SortingStep> steps = new ArrayList<>();
        steps.add(new SortingStep(new ArrayList<>(numbers), "초기 상태: 메모리에 " + numbers + " 저장"));

        TreeSet<Integer> tree = new TreeSet<>();
        for (int num : numbers) {
            tree.add(num);
            List<Integer> sortedList = new ArrayList<>(tree);
            sortedList.addAll(numbers.subList(tree.size(), numbers.size()));
            steps.add(new SortingStep(sortedList,
                    String.format("%d를 트리에 삽입. 현재 트리: %s", num, tree)));
        }

        steps.add(new SortingStep(new ArrayList<>(tree), "정렬 완료: " + tree));
        return steps;
    }

    private List<SortingStep> timSort(List<Integer> numbers) {
        List<SortingStep> steps = new ArrayList<>();
        steps.add(new SortingStep(new ArrayList<>(numbers), "초기 상태: 메모리에 " + numbers + " 저장"));

        for (int i = 1; i <= numbers.size(); i++) {
            Collections.sort(numbers.subList(0, i));
            steps.add(new SortingStep(new ArrayList<>(numbers),
                    String.format("메모리 위치 0부터 %d까지 정렬", i - 1)));
        }

        steps.add(new SortingStep(new ArrayList<>(numbers), "정렬 완료: " + numbers));
        return steps;
    }
}