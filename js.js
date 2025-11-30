// script.js
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const studentIdsTextarea_1 = document.getElementById('studentIds_1');
    const studentIdsTextarea_2 = document.getElementById('studentIds_2');
    const drawCountInput = document.getElementById('drawCount');
    const drawBtn = document.getElementById('drawBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultDisplay = document.getElementById('resultDisplay');
    const historyList = document.getElementById('historyList');
    const add = document.getElementById('add')
    const subtract = document.getElementById('subtract')
    
    // 存储抽取历史
    let drawHistory = [];
    
    // 示例学号数据
    studentIdsTextarea_1.value = 1
    studentIdsTextarea_2.value = 48
    
    // 抽取按钮点击事件
    drawBtn.addEventListener('click', function() {
        drawStudentIds();
    });
    
    // 重置按钮点击事件
    resetBtn.addEventListener('click', function() {
        resetApp();
    });
    
    // +1按钮点击事件
    add.addEventListener('click', function() {
       drawCountInput.value = Number(drawCountInput.value) - 1; 
    });

    // -1按钮点击事件
    subtract.addEventListener('click',function() {
        drawCountInput.value = 1;
    });

    // 回车键快捷抽取
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            drawStudentIds();
        }
    });
    
    function extractStudentIds(startId, endId, count) {
        // 参数验证
        console.log(startId +" "+ endId + " " + count);
        if (typeof startId !== 'number' || typeof endId !== 'number' || typeof count !== 'number') {
            alert('所有参数必须是数字类型');
            return;
        }
        
        if (startId < 0 || endId < 0 || count < 0) {
            alert('参数不能为负数');
            return;
        }
        
        if (startId > endId) {
            alert('起始学号不能大于结束学号');
            return;
        }
        
        const totalNumbers = endId - startId + 1;
        
        if (count > totalNumbers) {
            alert(`抽取数量(${count})不能超过学号范围(${totalNumbers})`);
            return;
        }
        
        if (count === 0) {
            return [];
    };
     
    // 生成范围内的所有学号
    const allStudentIds = [];
    for (let i = startId; i <= endId; i++) {
        allStudentIds.push(i);
    }
    
    // 随机抽取指定数量的学号
    const selectedIds = [];
    const availableIds = [...allStudentIds];
    
    for (let i = 0; i < count; i++) {
        if (availableIds.length === 0) break;
        
        const randomIndex = Math.floor(Math.random() * availableIds.length);
        selectedIds.push(availableIds[randomIndex]);
        availableIds.splice(randomIndex, 1);
    }
    
    return selectedIds;
    }

    // 抽取学号函数
    function drawStudentIds() {
        // 获取输入的学号
        const input_1 = studentIdsTextarea_1.value;
        const input_2 = studentIdsTextarea_2.value;
        if (!input_1 || !input_2) {
            alert('请输入学号！');
            return;
        }

        // 获取抽取数量
        const drawCount = parseInt(drawCountInput.value);

        const selectedIds = extractStudentIds(Number(input_1), Number(input_2), Number(drawCount));
        // if (isNaN(drawCount) || drawCount < 1) {
        //     alert('请输入有效的抽取数量！');
        //     return;
        // }
        
        // if (drawCount > studentIds.length) {
        //     alert(`抽取数量不能超过学号总数（${studentIds.length}）！`);
        //     return;
        // }
        
        // 随机抽取学号
        // const selectedIds = [];
        // const availableIds = [...studentIds];
        
        // for (let i = 0; i < drawCount; i++) {
        //     if (availableIds.length === 0) break;
            
        //     const randomIndex = Math.floor(Math.random() * availableIds.length);
        //     selectedIds.push(availableIds[randomIndex]);
        //     availableIds.splice(randomIndex, 1);
        // }
        
        
        // 显示抽取结果
        displayResult(selectedIds);
        
        // 添加到历史记录
        addToHistory(selectedIds);
    }
    
    // 显示抽取结果
    function displayResult(selectedIds) {
        resultDisplay.innerHTML = '';
        
        if (selectedIds.length === 0) {
            resultDisplay.innerHTML = '<p class="placeholder">没有抽取到学号</p>';
            return;
        }
        
        selectedIds.forEach(id => {
            const idElement = document.createElement('div');
            idElement.className = 'student-id';
            idElement.textContent = id;
            resultDisplay.appendChild(idElement);
        });
    }
    
    // 添加到历史记录
    function addToHistory(selectedIds) {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        
        const historyItem = {
            time: timeString,
            ids: [...selectedIds]
        };
        
        drawHistory.unshift(historyItem);
        
        // 只保留最近10条记录
        if (drawHistory.length > 10) {
            drawHistory = drawHistory.slice(0, 10);
        }
        
        // 更新历史记录显示
        updateHistoryDisplay();
    }
    
    // 更新历史记录显示
    function updateHistoryDisplay() {
        historyList.innerHTML = '';
        
        if (drawHistory.length === 0) {
            historyList.innerHTML = '<p style="text-align: center; color: #7f8c8d;">暂无历史记录</p>';
            return;
        }
        
        drawHistory.forEach(item => {
            const historyItemElement = document.createElement('div');
            historyItemElement.className = 'history-item';
            
            const idsElement = document.createElement('div');
            idsElement.textContent = item.ids.join(', ');
            
            const timeElement = document.createElement('div');
            timeElement.className = 'history-time';
            timeElement.textContent = item.time;
            
            historyItemElement.appendChild(idsElement);
            historyItemElement.appendChild(timeElement);
            
            historyList.appendChild(historyItemElement);
        });
    }
    
    // 重置应用
    function resetApp() {
        resultDisplay.innerHTML = '<p class="placeholder">点击"抽取学号"按钮开始抽取</p>';
        drawHistory = [];
        updateHistoryDisplay();
        studentIdsTextarea_1.value = 1
        studentIdsTextarea_2.value = 48
        drawCountInput.value = '1';
    }
    
    // 初始化历史记录显示
    updateHistoryDisplay();
});