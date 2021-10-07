import axios from "axios";

// const BASE_PATH = 'http://127.0.0.1:1337/';
// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbiIsImlhdCI6MTYzMjg5MDYxNywiZXhwIjoxNjM0MTg2NjE3fQ.Sg5wCnEmFVvp9hRhTvx4QnfCo63r9tJOBgZIZLg6N-0";
const BASE_PATH = 'http://49.232.100.177:1337/';
// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbiIsImlhdCI6MTYzMjg5MDYxNywiZXhwIjoxNjM0MTg2NjE3fQ.Sg5wCnEmFVvp9hRhTvx4QnfCo63r9tJOBgZIZLg6N-0";

export const test = () => {
  
  // axios({
  //   url: BASE_PATH + 'v1/login',
  //   method: 'POST',
  //   data: data,
  //   header:{
  //       'Content-Type':'application/json'
  //   }
  // })
  // selectAllStudent({
  //   id: 123333,
  //   name: "name",
  //   classes: "1",
  //   teacher: "1"
  // })
  
  // publishRecord({
  //   date: "123",
  //   number: 123,
  //   absences: "1"
  // })
  // selectRecord({
  //   date: "123"
  // })
  // selectRecordDate()
  selectAbsenceRecord({
    date: "123"
  })
}



export const selectAbsenceRecord = (data) => {
  return axios({
    url: BASE_PATH + 'v1/record/select/absence',
    params: data,
    method: 'GET',
    headers: {
        'Content-Type':'application/json',
        'token':  localStorage.getItem("token"),
        'username': 'admin'
    }
  })
}

// 所有记录的发布
export const selectRecordDate = () => {
  return axios({
    url: BASE_PATH + 'v1/record/select/date',
    method: 'GET',
    headers: {
        'Content-Type':'application/json',
        'token':  localStorage.getItem("token"),
        'username': 'admin'
    }
  })
}

// 未缺勤
export const selectRecord = (data) => {
  return axios({
    url: BASE_PATH + 'v1/record/select',
    method: 'GET',
    params: data,
    headers: {
        'Content-Type':'application/json',
        'token':  localStorage.getItem("token"),
        'username': 'admin'
    }
  })
}

export const addRecord = (data) => {
  return axios({
    url: BASE_PATH + 'v1/record/add',
    method: 'POST',
    data: data,
    headers: {
        'Content-Type':'application/json',
        'token':  localStorage.getItem("token"),
        'username': 'admin'
    }
  })
}

// RollCall
// 正在进行的点名
export const selectRollCall = () => {
  return axios({
    url: BASE_PATH + 'v1/rollcall/select',
    method: 'GET',
    headers: {
        'Content-Type':'application/json',
        'token': localStorage.getItem("token"),
        'username': 'admin'
    }
  })
}

export const publishRollCall = (data) => {
  return axios({
    url: BASE_PATH + 'v1/rollcall/publish',
    method: 'POST',
    data: data,
    headers: {
        'Content-Type':'application/json',
        'token':  localStorage.getItem("token"),
        'username': 'admin'
    }
  })
}

// Student
export const selectAllStudent = () => {
  return axios({
    url: BASE_PATH + 'v1/student/select/all',
    method: 'GET',
    headers: {
        'Content-Type':'application/json',
        'token':  localStorage.getItem("token"),
        'username': 'admin'
    }
  })
}

export const updateStudent = (data) => {
  return axios({
    url: BASE_PATH + 'v1/student/update',
    method: 'PUT',
    data: data,
    headers: {
        'Content-Type':'application/json',
        'token':  localStorage.getItem("token"),
        'username': 'admin'
    }
  })
}

export const deleteStudent = (data) => {
  return axios({
    url: BASE_PATH + 'v1/student/delete',
    method: 'DELETE',
    data: data,
    headers: {
        'Content-Type':'application/json',
        'token':  localStorage.getItem("token"),
        'username': 'admin'
    }
  })
}

export const addStudent = (data) => {
  return axios({
    url: BASE_PATH + 'v1/student/add',
    method: 'POST',
    data: data,
    headers: {
        'Content-Type':'application/json',
        'token':  localStorage.getItem("token"),
        'username': 'admin'
    }
  })
}

// Login
export const login = (data) => {
  return axios({
    url: BASE_PATH + 'v1/login',
    method: 'POST',
    data: data,
    header:{
        'Content-Type':'application/json'
    }
  }).then((res) => {
    let resData = res.data;
    if (resData.code == 200) {
      localStorage.setItem("token", resData.token);
      
    }
    return res.data;
  })
}
