package com.kjunh972.variousSorting.service;

import com.kjunh972.variousSorting.DTO.SortingStep;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SortingService {
    public List<SortingStep> sort(String algorithm, List<Integer> numbers) {
        switch (algorithm.trim().toLowerCase()) {
            case "선택정렬":
            case "선택 정렬":
            case "selection":
                return selectionSort(new ArrayList<>(numbers));
            case "삽입정렬":    
            case "삽입 정렬":
            case "insertion":
                return insertionSort(new ArrayList<>(numbers));
            case "버블정렬":
            case "버블 정렬":
            case "bubble":
                return bubbleSort(new ArrayList<>(numbers));
            case "병합정렬":
            case "병합 정렬":
            case "merge":
                return mergeSort(new ArrayList<>(numbers));
            case "힙정렬":
            case "힙 정렬":
            case "heap":
                return heapSort(new ArrayList<>(numbers));
            case "트리정렬":
            case "트리 정렬":
            case "tree":
                return treeSort(new ArrayList<>(numbers));
            default:
                throw new IllegalArgumentException("알 수 없는 정렬 알고리즘입니다: " + algorithm);
        }
    }

    private List<SortingStep> selectionSort(List<Integer> arr) {
        List<SortingStep> steps = new ArrayList<>();
        int n = arr.size();

        steps.add(new SortingStep(new ArrayList<>(arr), "선택 정렬을 시작합니다. 이 알고리즘은 배열을 순회하면서 가장 작은 원소를 찾아 앞으로 이동시킵니다.", new HashMap<>(), new ArrayList<>()));

        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr.get(j) < arr.get(minIdx)) {
                    minIdx = j;
                }
            }
            if (minIdx != i) {
                Collections.swap(arr, i, minIdx);
                Map<String, Integer> variables = new HashMap<>();
                variables.put("i", i);
                variables.put("minIdx", minIdx);
                List<Integer> activeIndices = Arrays.asList(i, minIdx);
                steps.add(new SortingStep(new ArrayList<>(arr),
                        String.format("%d번째 위치(%d)와 현재 찾은 최소값의 위치(%d)를 교환했습니다. 값 %d를 %d번째 위치에 배치했습니다. 이제 인덱스 0부터 %d까지는 정렬된 상태입니다.",
                                i, arr.get(minIdx), arr.get(i), arr.get(i), i, i),
                        variables, activeIndices));
            }
        }

        steps.add(new SortingStep(new ArrayList<>(arr), "선택 정렬이 완료되었습니다. 모든 원소가 오름차순으로 정렬되었습니다. 선택 정렬은 간단하지만 항상 O(n^2)의 시간 복잡도를 가지므로 대규모 데이터에는 비효율적일 수 있습니다.", new HashMap<>(), new ArrayList<>()));
        return steps;
    }

    private List<SortingStep> insertionSort(List<Integer> arr) {
        List<SortingStep> steps = new ArrayList<>();
        int n = arr.size();

        steps.add(new SortingStep(new ArrayList<>(arr), "삽입 정렬을 시작합니다. 이 알고리즘은 각 원소를 이미 정렬된 부분의 적절한 위치에 삽입하는 방식으로 동작합니다.", new HashMap<>(), new ArrayList<>()));

        for (int i = 1; i < n; i++) {
            int key = arr.get(i);
            int j = i - 1;

            while (j >= 0 && arr.get(j) > key) {
                arr.set(j + 1, arr.get(j));
                j = j - 1;
            }
            arr.set(j + 1, key);
            Map<String, Integer> variables = new HashMap<>();
            variables.put("i", i);
            variables.put("key", key);
            variables.put("j", j);
            List<Integer> activeIndices = Arrays.asList(i, j + 1);
            steps.add(new SortingStep(new ArrayList<>(arr),
                    String.format("현재 검사 중인 값 %d를 왼쪽의 정렬된 부분에서 적절한 위치(%d)에 삽입했습니다. 이 과정에서 %d부터 %d까지의 원소들을 오른쪽으로 한 칸씩 이동시켰습니다.",
                            key, j + 1, j + 1, i - 1),
                    variables, activeIndices));
        }

        steps.add(new SortingStep(new ArrayList<>(arr), "삽입 정렬이 완료되었습니다. 모든 원소가 적절한 위치에 삽입되어 정렬되었습니다. 삽입 정렬은 작은 데이터셋이나 거의 정렬된 데이터에 대해 효율적이며, 최선의 경우 O(n)의 시간 복잡도를 가집니다.", new HashMap<>(), new ArrayList<>()));
        return steps;
    }

    private List<SortingStep> bubbleSort(List<Integer> arr) {
        List<SortingStep> steps = new ArrayList<>();
        int n = arr.size();

        steps.add(new SortingStep(new ArrayList<>(arr), "버블 정렬을 시작합��다. 이 알고리즘은 인접한 두 원소를 비교하여 큰 값을 뒤로 보내는 과정을 반복합니다.", new HashMap<>(), new ArrayList<>()));

        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr.get(j) > arr.get(j + 1)) {
                    Collections.swap(arr, j, j + 1);
                    swapped = true;
                    Map<String, Integer> variables = new HashMap<>();
                    variables.put("i", i);
                    variables.put("j", j);
                    List<Integer> activeIndices = Arrays.asList(j, j + 1);
                    steps.add(new SortingStep(new ArrayList<>(arr),
                            String.format("%d번째와 %d번째 원소를 비교하여 %d와 %d를 교환했습니다. 큰 값 %d가 오른쪽으로 이동했습니다.",
                                    j, j + 1, arr.get(j), arr.get(j + 1), arr.get(j + 1)),
                            variables, activeIndices));
                }
            }
            if (!swapped) {
                steps.add(new SortingStep(new ArrayList<>(arr), String.format("%d번째 패스에서 교환이 없었으므로, 배열이 이미 정렬되어 있습니다. 알고리즘을 조기 종료합니다.", i + 1), new HashMap<>(), new ArrayList<>()));
                break;
            }
        }

        steps.add(new SortingStep(new ArrayList<>(arr), "버블 정렬이 완료되었습니다. 모든 큰 값들이 오른쪽으로 이동하여 정렬되었습니다. 버블 정렬은 구현이 간단하지만 O(n^2)의 시간 복잡도로 인해 대규모 데이터에는 비효율적입니다.", new HashMap<>(), new ArrayList<>()));
        return steps;
    }

    private List<SortingStep> mergeSort(List<Integer> arr) {
        List<SortingStep> steps = new ArrayList<>();
        steps.add(new SortingStep(new ArrayList<>(arr), "병합 정렬을 시작합니다. 이 알고리즘은 배열을 재귀적으로 작은 부분으로 나누고 다시 병합하며 정렬합니다.", new HashMap<>(), new ArrayList<>()));
        mergeSortHelper(arr, 0, arr.size() - 1, steps);
        steps.add(new SortingStep(new ArrayList<>(arr), "병합 정렬이 완료되었습니다. 모든 부분 배열이 정렬되어 하나의 정렬된 배열로 병합되었습니다. 병합 정렬은 안정적이고 O(n log n)의 시간 복잡도를 가지지만, 추가 메모리가 필요합니다.", new HashMap<>(), new ArrayList<>()));
        return steps;
    }

    private void mergeSortHelper(List<Integer> arr, int left, int right, List<SortingStep> steps) {
        if (left < right) {
            int mid = (left + right) / 2;
            mergeSortHelper(arr, left, mid, steps);
            mergeSortHelper(arr, mid + 1, right, steps);
            merge(arr, left, mid, right, steps);
        }
    }

    private void merge(List<Integer> arr, int left, int mid, int right, List<SortingStep> steps) {
        List<Integer> leftArr = new ArrayList<>(arr.subList(left, mid + 1));
        List<Integer> rightArr = new ArrayList<>(arr.subList(mid + 1, right + 1));

        int i = 0, j = 0, k = left;
        while (i < leftArr.size() && j < rightArr.size()) {
            if (leftArr.get(i) <= rightArr.get(j)) {
                arr.set(k++, leftArr.get(i++));
            } else {
                arr.set(k++, rightArr.get(j++));
            }
        }

        while (i < leftArr.size()) {
            arr.set(k++, leftArr.get(i++));
        }

        while (j < rightArr.size()) {
            arr.set(k++, rightArr.get(j++));
        }

        Map<String, Integer> variables = new HashMap<>();
        variables.put("left", left);
        variables.put("mid", mid);
        variables.put("right", right);
        List<Integer> activeIndices = new ArrayList<>();
        for (int idx = left; idx <= right; idx++) {
            activeIndices.add(idx);
        }
        steps.add(new SortingStep(new ArrayList<>(arr),
                String.format("%d부터 %d까지의 부분을 병합했습니다. 왼쪽 부분 배열(%d-%d)과 오른쪽 부분 배열(%d-%d)을 비교하여 작은 값부터 차례로 병합된 배열에 넣었습니다.",
                        left, right, left, mid, mid + 1, right),
                variables, activeIndices));
    }

    private List<SortingStep> heapSort(List<Integer> arr) {
        List<SortingStep> steps = new ArrayList<>();
        int n = arr.size();

        steps.add(new SortingStep(new ArrayList<>(arr), "힙 정렬을 시작합니다. 먼저 배열을 최대 힙으로 구성합니다. 최대 힙은 부모 노드가 항상 자식 노드보다 크거나 같은 완전 이진 트리입니다.", new HashMap<>(), new ArrayList<>()));

        // 최대 힙 구성
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i, steps);
        }

        steps.add(new SortingStep(new ArrayList<>(arr), "최대 힙이 구성되었습니다. 이제 힙에서 요소를 하나씩 추출하여 정렬합니다. 최대값(루트)을 배열의 끝으로 이동시키고, 힙의 크기를 줄여가며 이 과정을 반복합니다.", new HashMap<>(), new ArrayList<>()));

        // 힙에서 요소를 하나씩 추출
        for (int i = n - 1; i > 0; i--) {
            Collections.swap(arr, 0, i);
            Map<String, Integer> variables = new HashMap<>();
            variables.put("i", i);
            List<Integer> activeIndices = Arrays.asList(0, i);
            steps.add(new SortingStep(new ArrayList<>(arr),
                    String.format("최대값 %d를 힙의 루트에서 추출하여 배열의 %d번째 위치로 이동했습니다. 이제 이 위치는 정렬되었으며, 힙의 크기를 %d로 줄입니다.",
                            arr.get(i), i, i),
                    variables, activeIndices));
            heapify(arr, i, 0, steps);
        }

        steps.add(new SortingStep(new ArrayList<>(arr), "힙 정렬이 완료되었습니다. 모든 요소가 힙에서 추출되어 정렬되었습니다. 힙 정렬은 O(n log n)의 시간 복잡도를 가지며, 추가 메모리를 사용하지 않는 in-place 정렬 알고리즘입니다.", new HashMap<>(), new ArrayList<>()));
        return steps;
    }

    private void heapify(List<Integer> arr, int n, int i, List<SortingStep> steps) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n && arr.get(left) > arr.get(largest)) {
            largest = left;
        }

        if (right < n && arr.get(right) > arr.get(largest)) {
            largest = right;
        }

        if (largest != i) {
            Collections.swap(arr, i, largest);
            Map<String, Integer> variables = new HashMap<>();
            variables.put("i", i);
            variables.put("largest", largest);
            List<Integer> activeIndices = Arrays.asList(i, largest);
            steps.add(new SortingStep(new ArrayList<>(arr),
                    String.format("%d번 노드(%d)와 %d번 노드(%d)를 교환했습니다. 이는 최대 힙 속성을 유지하기 위한 과정입니다. 부모 노드가 자식 노드보다 크거나 같아야 합니다.",
                            i, arr.get(largest), largest, arr.get(i)),
                    variables, activeIndices));
            heapify(arr, n, largest, steps);
        }
    }

    private List<SortingStep> treeSort(List<Integer> arr) {
        List<SortingStep> steps = new ArrayList<>();
        steps.add(new SortingStep(new ArrayList<>(arr), "트리 정렬을 시작합니다. 이 알고리즘은 이진 검색 트리를 구성하고 중위 순회하여 정렬합니다.", new HashMap<>(), new ArrayList<>()));

        TreeSet<Integer> treeSet = new TreeSet<>();
        for (int i = 0; i < arr.size(); i++) {
            treeSet.add(arr.get(i));
            Map<String, Integer> variables = new HashMap<>();
            variables.put("inserted", arr.get(i));
            steps.add(new SortingStep(new ArrayList<>(treeSet),
                    String.format("%d를 이진 검색 트리에 삽입했습니다. 트리는 자동으로 정렬 상태를 유지합니다. 현재 트리의 상태: %s", arr.get(i), treeSet),
                    variables, Arrays.asList(i)));
        }

        arr.clear();
        arr.addAll(treeSet);

        steps.add(new SortingStep(new ArrayList<>(arr), "이진 검색 트리를 중위 순회하여 정렬된 결과를 얻었습니다. 트리의 왼쪽에서 오른쪽으로 순회하면 자연스럽게 오름차순으로 정렬됩니다.", new HashMap<>(), new ArrayList<>()));
        steps.add(new SortingStep(new ArrayList<>(arr), "트리 정렬이 완료되었습니다. 모든 요소가 이진 검색 트리를 통해 정렬되었습니다. 트리 정렬은 O(n log n)의 시간 복잡도를 가지며 안정적이지만, 추가 메모리를 사용합니다.", new HashMap<>(), new ArrayList<>()));
        return steps;
    }
}