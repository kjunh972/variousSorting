package com.kjunh972.variousSorting.service;

import com.kjunh972.variousSorting.DTO.SortingStep;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SortingService {
    public List<SortingStep> sort(String algorithm, List<Integer> numbers) {
        switch (algorithm.trim().toLowerCase()) {
            case "선택 정렬":
            case "selection":
                return selectionSort(new ArrayList<>(numbers));
            case "삽입 정렬":
            case "insertion":
                return insertionSort(new ArrayList<>(numbers));
            case "버블 정렬":
            case "bubble":
                return bubbleSort(new ArrayList<>(numbers));
            case "병합 정렬":
            case "merge":
                return mergeSort(new ArrayList<>(numbers));
            case "힙 정렬":
            case "heap":
                return heapSort(new ArrayList<>(numbers));
            case "퀵 정렬":
            case "quick":
                return quickSort(new ArrayList<>(numbers));
            case "트리 정렬":
            case "tree":
                return treeSort(new ArrayList<>(numbers));
            case "팀 정렬":
            case "tim":
                return timSort(new ArrayList<>(numbers));
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

        steps.add(new SortingStep(new ArrayList<>(arr), "버블 정렬을 시작합니다. 이 알고리즘은 인접한 두 원소를 비교하여 큰 값을 뒤로 보내는 과정을 반복합니다.", new HashMap<>(), new ArrayList<>()));

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

    private List<SortingStep> quickSort(List<Integer> arr) {
        List<SortingStep> steps = new ArrayList<>();
        steps.add(new SortingStep(new ArrayList<>(arr), "퀵 정렬을 시작합니다. 이 알고리즘은 피벗을 선택하고 배열을 분할하여 정렬합니다. 분할 정복 방식으로 작동하며, 평균적으로 매우 효율적입니다.", new HashMap<>(), new ArrayList<>()));
        quickSortHelper(arr, 0, arr.size() - 1, steps);
        steps.add(new SortingStep(new ArrayList<>(arr), "퀵 정렬이 완료되었습니다. 모든 부분 배열이 정렬되었습니다. 퀵 정렬은 평균적으로 O(n log n)의 시간 복잡도를 가지지만, 최악의 경우 O(n^2)가 될 수 있습니다.", new HashMap<>(), new ArrayList<>()));
        return steps;
    }

    private void quickSortHelper(List<Integer> arr, int low, int high, List<SortingStep> steps) {
        if (low < high) {
            int pi = partition(arr, low, high, steps);
            quickSortHelper(arr, low, pi - 1, steps);
            quickSortHelper(arr, pi + 1, high, steps);
        }
    }

    private int partition(List<Integer> arr, int low, int high, List<SortingStep> steps) {
        int pivot = arr.get(high);
        int i = (low - 1);

        steps.add(new SortingStep(new ArrayList<>(arr),
                String.format("피벗 %d를 선택했습니다(마지막 요소). 이제 피벗보다 작은 요소는 왼쪽으로, 큰 요소는 오른쪽으로 이동시킵니다.", pivot),
                new HashMap<>(), Arrays.asList(high)));

        for (int j = low; j < high; j++) {
            if (arr.get(j) < pivot) {
                i++;
                Collections.swap(arr, i, j);
                Map<String, Integer> variables = new HashMap<>();
                variables.put("i", i);
                variables.put("j", j);
                variables.put("pivot", pivot);
                List<Integer> activeIndices = Arrays.asList(i, j, high);
                steps.add(new SortingStep(new ArrayList<>(arr),
                        String.format("%d번째 요소 %d와 %d번째 요소 %d를 교환했습니다. %d는 피벗 %d보다 작으므로 왼쪽으로 이동했습니다.",
                                i, arr.get(i), j, arr.get(j), arr.get(i), pivot),
                        variables, activeIndices));
            }
        }

        Collections.swap(arr, i + 1, high);
        Map<String, Integer> variables = new HashMap<>();
        variables.put("i", i + 1);
        variables.put("pivot", pivot);
        List<Integer> activeIndices = Arrays.asList(i + 1, high);
        steps.add(new SortingStep(new ArrayList<>(arr),
                String.format("피벗 %d를 %d번째 위치로 이동했습니다. 이제 피벗의 왼쪽은 모두 피벗보다 작고, 오른쪽은 모두 피벗보다 큽니다.",
                        pivot, i + 1),
                variables, activeIndices));

        return i + 1;
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

    private List<SortingStep> timSort(List<Integer> arr) {
        List<SortingStep> steps = new ArrayList<>();
        steps.add(new SortingStep(new ArrayList<>(arr), "팀 정렬을 시작합니다. 이 알고리즘은 삽입 정렬과 병합 정렬을 결합한 하이브리드 정렬 알고리즘으로, 실제 데이터에서 매우 효율적입니다.", new HashMap<>(), new ArrayList<>()));

        int minRun = calculateMinRun(arr.size());
        steps.add(new SortingStep(new ArrayList<>(arr),
                String.format("배열 크기 %d에 대한 minRun을 %d로 계산했습니다. minRun은 각 run의 최소 길이를 결정하며, 이는 팀 정렬의 효율성에 중요한 역할을 합니다.", arr.size(), minRun),
                new HashMap<>(), new ArrayList<>()));

        List<List<Integer>> runs = new ArrayList<>();

        // Step 1: 배열을 minRun 크기의 run으로 분할하고 각각 정렬
        for (int i = 0; i < arr.size(); i += minRun) {
            int end = Math.min(i + minRun, arr.size());
            List<Integer> run = new ArrayList<>(arr.subList(i, end));
            steps.add(new SortingStep(new ArrayList<>(arr),
                    String.format("Run %d를 생성했습니다: %s. 이 run을 삽입 정렬로 정렬하겠습니다. 작은 크기의 run에는 삽입 정렬이 효율적입니다.", runs.size() + 1, run),
                    new HashMap<>(), new ArrayList<>(run)));

            insertionSort(run, steps);
            runs.add(run);

            steps.add(new SortingStep(new ArrayList<>(arr),
                    String.format("Run %d를 삽입 정렬로 정렬했습니다: %s. 이제 이 run은 정렬된 상태입니다.", runs.size(), run),
                    new HashMap<>(), new ArrayList<>(run)));
        }

        steps.add(new SortingStep(new ArrayList<>(arr),
                String.format("총 %d개의 run을 생성하고 각각 정렬했습니다. 이제 이 run들을 병합하는 과정을 시작합니다.", runs.size()),
                new HashMap<>(), new ArrayList<>()));

        // Step 2: Run들을 병합
        while (runs.size() > 1) {
            List<List<Integer>> newRuns = new ArrayList<>();
            for (int i = 0; i < runs.size(); i += 2) {
                if (i == runs.size() - 1) {
                    newRuns.add(runs.get(i));
                    steps.add(new SortingStep(new ArrayList<>(arr),
                            String.format("Run %d는 병합할 상대가 없어 그대로 다음 단계로 넘어갑니다. 이는 run의 개수가 홀수일 때 발생합니다.", i + 1),
                            new HashMap<>(), new ArrayList<>(runs.get(i))));
                } else {
                    steps.add(new SortingStep(new ArrayList<>(arr),
                            String.format("Run %d와 Run %d를 병합하겠습니다. 병합 과정은 두 정렬된 배열을 효율적으로 하나로 합치는 과정입니다.", i + 1, i + 2),
                            new HashMap<>(), new ArrayList<>()));

                    List<Integer> mergedRun = mergeTwoRuns(runs.get(i), runs.get(i+1), steps);
                    newRuns.add(mergedRun);

                    updateArrayWithRuns(arr, newRuns, steps);
                    steps.add(new SortingStep(new ArrayList<>(arr),
                            String.format("Run %d와 Run %d를 병합했습니다: %s. 병합된 run도 정렬된 상태를 유지합니다.", i + 1, i + 2, mergedRun),
                            new HashMap<>(), new ArrayList<>(mergedRun)));
                }
            }
            runs = newRuns;
            steps.add(new SortingStep(new ArrayList<>(arr),
                    String.format("병합 단계를 완료했습니다. 현재 %d개의 run이 남아있습니다. run의 수가 줄어들면서 각 run의 크기는 커지고, 전체 배열이 점진적으로 정렬됩니다.", runs.size()),
                    new HashMap<>(), new ArrayList<>()));
        }

        updateArrayWithRuns(arr, runs, steps);
        steps.add(new SortingStep(new ArrayList<>(arr), "팀 정렬이 완료되었습니다. 모든 run이 병합되어 하나의 완전히 정렬된 배열이 되었습니다. 팀 정렬은 실제 데이터에서 매우 효율적이며, 안정적인 정렬 알고리즘입니다.", new HashMap<>(), new ArrayList<>()));
        return steps;
    }

    private int calculateMinRun(int n) {
        int r = 0;
        while (n >= 64) {
            r |= n & 1;
            n >>= 1;
        }
        return n + r;
    }

    private void insertionSort(List<Integer> run, List<SortingStep> steps) {
        for (int i = 1; i < run.size(); i++) {
            int key = run.get(i);
            int j = i - 1;
            while (j >= 0 && run.get(j) > key) {
                run.set(j + 1, run.get(j));
                j--;
            }
            run.set(j + 1, key);
            steps.add(new SortingStep(new ArrayList<>(run),
                    String.format("%d를 적절한 위치에 삽입했습니다. 현재 요소 %d를 임시 변수(key)에 저장하고, 이미 정렬된 왼쪽 부분에서 key보다 큰 요소들을 오른쪽으로 이동시켰습니다. 그리고 key를 적절한 위치(%d)에 삽입했습니다.", key, key, j + 1),
                    new HashMap<>(), Arrays.asList(j + 1)));
        }
    }

    private List<Integer> mergeTwoRuns(List<Integer> run1, List<Integer> run2, List<SortingStep> steps) {
        List<Integer> merged = new ArrayList<>();
        int i = 0, j = 0;
        while (i < run1.size() && j < run2.size()) {
            if (run1.get(i) <= run2.get(j)) {
                merged.add(run1.get(i));
                steps.add(new SortingStep(new ArrayList<>(merged),
                        String.format("%d를 병합된 리스트에 추가했습니다. Run 1과 Run 2의 현재 요소를 비교하여 더 작은 값 %d를 선택했습니다. 이 값은 Run 1의 현재 인덱스 %d에서 가져왔습니다.", run1.get(i), run1.get(i), i),

                        new HashMap<>(), Arrays.asList(merged.size() - 1)));
                i++;
            } else {
                merged.add(run2.get(j));
                steps.add(new SortingStep(new ArrayList<>(merged),
                        String.format("%d를 병합된 리스트에 추가했습니다. (Run 2에서 가져옴) 두 run의 현재 요소를 비교하여 더 작은 값 %d를 선택했습니다. 이 값은 Run 2의 현재 인덱스 %d에서 가져왔습니다.", run2.get(j), run2.get(j), j),
                        new HashMap<>(), Arrays.asList(merged.size() - 1)));
                j++;
            }
        }
        while (i < run1.size()) {
            merged.add(run1.get(i));
            steps.add(new SortingStep(new ArrayList<>(merged),
                    String.format("%d를 병합된 리스트에 추가했습니다. (Run 1의 남은 요소) Run 2의 모든 요소가 이미 사용되었으므로, Run 1의 남은 요소 %d를 그대로 추가합니다. 현재 Run 1의 인덱스는 %d입니다.", run1.get(i), run1.get(i), i),
                    new HashMap<>(), Arrays.asList(merged.size() - 1)));
            i++;
        }
        while (j < run2.size()) {
            merged.add(run2.get(j));
            steps.add(new SortingStep(new ArrayList<>(merged),
                    String.format("%d를 병합된 리스트에 추가했습니다. (Run 2의 남은 요소) Run 1의 모든 요소가 이미 사용되었으므로, Run 2의 남은 요소 %d를 그대로 추가합니다. 현재 Run 2의 인덱스는 %d입니다.", run2.get(j), run2.get(j), j),
                    new HashMap<>(), Arrays.asList(merged.size() - 1)));
            j++;
        }
        return merged;
    }

    private void updateArrayWithRuns(List<Integer> arr, List<List<Integer>> runs, List<SortingStep> steps) {
        arr.clear();
        for (List<Integer> run : runs) {
            arr.addAll(run);
        }
        // 모든 run을 하나의 배열로 합쳤음을 설명하는 단계를 추가
        steps.add(new SortingStep(new ArrayList<>(arr),
                String.format("모든 run을 하나의 배열로 합쳤습니다. 현재 배열의 상태: %s", arr),
                new HashMap<>(), new ArrayList<>()));
    }
}