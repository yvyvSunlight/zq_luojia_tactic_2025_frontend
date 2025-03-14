import { instance } from './instance.js'
import { ElMessage } from 'element-plus';
// 接口


/**
 * @description: 注册用户信息
 * @param {*} user_name: 学生姓名 
 * @param {*} student_num: 学生学号
 * @param {*} college: 学院
 * @return {[{id, name, student_num, college}]} 返回用户信息
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
        localStorage.setItem('user_id', res.id);
        localStorage.setItem('student_num', res.student_id);
        return true;
    } catch (error) {
        if (!error.response) {
            return false;
        }
        const data = error.response.data;
        if (data.student_id[0] === 'user with this student id already exists.') {
            ElMessage.error('学号已存在');
          } else {
            ElMessage.error('未知错误');
          }
        return false;
    }
}

/**
 * @description: 加入队伍
 * @param {*} user_id: 用户id
 * @param {*} team_id: 队伍id
 * 
 */
export const joinTeam = async (user_id, team_name) => {
    try {
        const res = await instance.put(`/enter_team`, {
            user_id,
            team_name
        });
        localStorage.setItem('team_id', res.team_id);
        localStorage.setItem('team_name', team_name);
        return true;
    }
    catch (error) {
        const user_id = localStorage.getItem('user_id');
        if (user_id) {
            deleteUser(user_id);
        }
        if (!error.response) {
            return false;
        }
        const data =  error.response.data;
        if(data.error === 'Team is full') {
            ElMessage.error('队伍已满');
          } else if (data.error === 'Team not found') {
            ElMessage.error('队伍不存在');
          } else if (data.error) {
            ElMessage.error('未知错误');
          }
        return false;
    }
}

export const createTeam = async (name, leader_id) =>
{
    try {
        const res = await instance.post('/team', {
            name,
            leader_id
        });
        localStorage.setItem('team_id', res.id);
        localStorage.setItem('team_name', name);
        return true;
    } catch (error) {
        if (!error.response) {
            const user_id = localStorage.getItem('user_id');
            if (user_id) {
                deleteUser(user_id);
            }
            return false;
        }
        if (error.response.data.name[0] === "team with this name already exists.") {
            const user_id = localStorage.getItem('user_id');
            ElMessage.error("队伍名已存在");
            if (user_id) {
                deleteUser(user_id);
                return false;
            }
        }
        return false;
    }
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
    localStorage.removeItem('user_id');
    localStorage.removeItem('student_num');
    return res;
}