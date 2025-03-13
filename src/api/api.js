import { instance } from './instance.js'

// 接口


/**
 * @description: 注册用户信息
 * @param {*} user_name: 学生姓名 
 * @param {*} student_num: 学生学号
 * @param {*} college: 学院
 * @return {[{id, name, student_num, college}]} 返回用户信息
 *  
 * @example
 * login({
 * username: 'username',
 * password: 'password'
 * })
 * .then(res => {
 * console.log(res)
 * })
 * .catch(err => {
 * console.log(err)
 * })
 */

export const signUp = async (name, student_id, college) => {
    console.log("发送注册api时的数据");
    const password = 123456
    console.log(name, student_id, college, password);
    try {
        const res = await instance.post('/register', {
            name,
            student_id,
            college,
            password
        });
        // console.log("注册成功----");
        // console.log(res);
        // console.log("保存localStorage user_id student_num"); 
        localStorage.setItem('user_id', res.id);
        localStorage.setItem('student_num', res.student_id);
        return res;
    } catch (error) {
        console.log("注册失败");
        console.log(error);
        return error.response.data;
    }
}

/**
 * @description: 加入队伍
 * @param {*} user_id: 用户id
 * @param {*} team_id: 队伍id
 * 
 */
export const joinTeam = async (user_id, team_name) => {
    console.log("加入队伍时的参数");
    console.log(user_id);
    console.log(team_name);
    try {
        const res = await instance.put(`/enter_team`, {
            user_id,
            team_name
        });
        console.log("加入队伍之后的返回值");
        console.log("join team join team")
        console.log(res);
        localStorage.setItem('team_id', res.team_id);
        return res;
    }
    catch (error) {
        console.log("加入队伍失败");
        console.log(error);
        return error.response.data;
    }
}

export const createTeam = async (name, leader_id) =>
{
    console.log("创建队伍之前");
    console.log(name, leader_id);
    const res = await instance.post('/team', {
        name,
        leader_id
    });
    console.log("创建队伍之后");
    console.log(res);
    console.log("打印创建队伍得res之后");
    localStorage.setItem('team_id', res.id);
    localStorage.setItem('team_name', name);
    console.log("localStorage 中的值:");
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(`${key}: ${value}`);
    }
    return res;
}

export const quitTeam = async (user_id, team_id) => {
    const res = await instance.delete(`/quit_team/${user_id}`, {
        team_id
    });
    localStorage.removeItem('team_id');
    return res;
}

/**
 * @description: 获取队伍信息
 * @param {*} team_id: 队伍id
 */

export const getTeamInfo = async (team_id) => {
    console.log("进入getTeamInfo获取队伍信息");
    console.log(team_id);
    const res = await instance.get(`/team/${team_id}`);
    return res;
}


/**
 * @description: 统计预约起始时间
 * @param {*} team_id: 队伍id
 * @param {*} reservation_time: 预约起始时间
 * @return {[{id, reservation_time}]} 返回预约起始时间
 */
export const collectReserveTime = async (team_id, reservation_time) => {
    const res = await instance.put(`/reserve_start_time/${team_id}`, {
        reservation_time
    });
    localStorage.setItem('reservation_start_time', res.reservation_time);
    return res;
}

/**
 * @description: 记录起始时间
 * @param {*} user_id: 用户id
 * @param {*} start_time: 起始时间
 * @return {[{id, start_time}]} 返回起始时间
 */
export const recordStartTime = async (team_id, start_time) => {
    console.log("recordStartTime时传参时候的队伍起始时间", start_time);
    const res = await instance.put(`/start_time/${team_id}`, {
        start_time
    });
    console.log("recordStartTime时记录的队伍id", team_id);
    console.log("recordStartTime时记录的起始时间", res.start_time);
    localStorage.setItem('start_time', res.start_time);
    return res;
}

export const  getStartTime = async (team_id) => {
    const res = await instance.get(`/start_time/${team_id}`);
    return res;
}

export const putTeamPosition = async (team_id, position) => {
    const res = await instance.put(`/position/${team_id}`, {
        position
    });
    return res;
}

export const getTeamPosition = async (team_id) => {
    const res = await instance.get(`/position/${team_id}`);
    return res;
}

export const putEndTime = async (team_id, end_time) => {
    const res = await instance.put(`/end_time/${team_id}`, {
        end_time
    });
    return res;
}

export const getEndTime = async (team_id) => {
    const res = await instance.get(`/end_time/${team_id}`);
    return res;
}

/**
 * @description: 删除单个用户信息
 * @param {*} user_id: 用户id
 */
export const deleteUser = async (user_id) => {
    const res = await instance.delete(`/user/${user_id}`);
    return res;
}