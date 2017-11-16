$(document).ready(function(){
    checkBoxStatesTransition("checkBox", "checkBox_all")
    checkBoxStatesTransition("checkBox1", "checkBox1_all")
});

/**
 * 复选按钮框组分析
 *      全选复选框
 *      单个复选框组
 * 
 * 1. 全选复选框--点击
 *      1)已选中状态下点击, 状态改变, 触发事件 -- 全部未选中
 *      2)非选中状态下点击, 状态改变, 触发事件 -- 全部已选中
 * 2. 单个复选框--点击
 *      1)已选中状态下点击, 状态改变, 触发事件 -- 全选复选框未选中
 *      2)未选中状态下点击, 状态改变, 触发事件 -- 检查单个复选框组是否全部已选中 
 * 3.约定
 *      全选复选框class属性是在单个复选框class属性上加字符串"_all"
 *      当然也可以选择定义输入
 * 
 * 
 * 
 */

function checkBoxStatesTransition(checkBoxClass, checkBoxAllClass){
    checkBoxAllClick("." + checkBoxClass, "." + checkBoxAllClass);
    checkBoxClick("." + checkBoxClass, "." + checkBoxAllClass);
}

function checkBoxAllClick(checkBoxClass, checkBoxAllClass){
    $(checkBoxAllClass).click(function(){
        var state = $(checkBoxAllClass).prop("checked");
        $(checkBoxClass).each(function(){
            $(this).prop("checked", state);
        });
    });
}

function checkBoxClick(checkBoxClass, checkBoxAllClass){
    $(checkBoxClass).click(function(){
        var states = checkBaxStates(checkBoxClass);
        $(checkBoxAllClass).prop("checked", states);
        
        //对于全选复选框的第三种显示状态进行判断显示
        var stateIndeterminate = checkBoxAllstateIndeterminate(checkBoxClass);
        if(states){
            $(checkBoxAllClass).prop("indeterminate", false);
        }else{
            $(checkBoxAllClass).prop("indeterminate", stateIndeterminate);
        }
    });
}

//单个复选框组整体状态判断
function checkBaxStates(checkBoxClass){
    var states = true;
    $(checkBoxClass).each(function(){
        if(!$(this).prop("checked")){
            states = false
            return ;
        }
    });
    return states;
}
//针对全选框第三种显示状态添加函数--判断单个复选框组是否部分选中
//(注: 该显示状态只有显示效果, 并不对应实际的状态值)
function checkBoxAllstateIndeterminate(checkBoxClass){
    var stateIndeterminate = false;
    $(checkBoxClass).each(function(){
        if($(this).prop("checked")){
            stateIndeterminate = true
            return ;
        }
    });
    return stateIndeterminate;
}





