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

export const signUp = async (student_name, student_num, college) => {
    console.log("发送注册api时的数据");
    console.log(student_name, student_num, college);
    const res = await instance.post('/register', {
        student_name,
        student_num,
        college
    });
    console.log("打印注册");
    console.log(res);
    if (res.status === 200) {
        localStorage.setItem('user_id', res.data.id);
        localStorage.setItem('student_num', res.data.student_num);
    } 
    return res;
}

/**
 * @description: 加入队伍
 * @param {*} user_id: 用户id
 * @param {*} team_id: 队伍id
 * 
 */
export const joinTeam = async (user_id, team_id) => {
    const res = await instance.post(`/enter_team/${user_id}`, {
        team_id
    });
    if (res.status === 200) {
        localStorage.setItem('team_id', res.data.team_id);
    }
    return res;
}

export const createTeam = async (team_name, leader_id) =>
{
    const res = await instance.post('/team', {
        team_name,
        leader_id
    });
    if (res.status === 200) {
        localStorage.setItem('team_id', res.data.team_id);
    }
    return res;
}

export const quitTeam = async (user_id, team_id) => {
    const res = await instance.delete(`/quit_team/${user_id}`, {
        team_id
    });
    if (res.status === 200) {
        localStorage.removeItem('team_id');
    }
    return res;
}

/**
 * @description: 获取队伍信息
 * @param {*} team_id: 队伍id
 */

export const getTeamInfo = async (team_id) => {
    const res = await instance.get(`/team/${team_id}`);
    return res;
}


/**
 * @description: 统计预约起始时间
 * @param {*} user_id: 用户id
 * @param {*} reservation_time: 预约起始时间
 * @return {[{id, reservation_time}]} 返回预约起始时间
 */
export const collectReserveTime = async (user_id, reservation_time) => {
    const res = await instance.post(`/reserve_time/${user_id}`, {
        reservation_time
    });
    if (res.status === 200) {
        localStorage.setItem('reservation_time', res.data.reservation_time);
    }
    return res;
}

/**
 * @description: 记录起始时间
 * @param {*} user_id: 用户id
 * @param {*} start_time: 起始时间
 * @return {[{id, start_time}]} 返回起始时间
 */
export const recordStartTime = async (user_id, start_time) => {
    const res = await instance.post(`/start_time/${user_id}`, {
        start_time
    });
    if (res.status === 200) {
        localStorage.setItem('start_time', res.data.start_time);
    }
    return res;
}

