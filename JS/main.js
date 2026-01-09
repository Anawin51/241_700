/*
array array array array array array array array array array
*/

const { newScore } = require("./newScore")

/*
let age1 = 20
let age2 = 25
let age3 = 30

let ages = [20, 25, 30]
//แทนที่
ages = [200, 100, 50]

console.log('age1 age2 age3', age1, age2, age3)
console.log(`age1 age2 age3 ${age1} ${age2} ${age3}`)
console.log('array',ages)

// ต่อ array
ages.push(25)
console.log('push array',ages)

// ลบ array ตัวสุดท้าย
ages.pop()
console.log('pop array', ages)

let age = [20, 25, 30, 35, 40]

if (ages.include(30)) {
    console.log('มีเลข30 อยู่ในarray')
}


let name_list = ['aa', 'bb', 'cc']
name_list.push('dd')
console.log(name_list)

name_list.pop()
console.log('pop name_list', name_list)
console.log('name_list', name_list.length)
console.log('name_list', name_list[0])
console.log('name_list', name_list[1])
console.log('name_list', name_list[2])

for (let index = 0; index < name_list.length; index++) {
    console.log('name list', name_list[index])
}
*/


/*
let student = [{
    age: 30
    name: 'aa',
    grade: 'A'
},{
    age: 35
    name: 'bb',
    grade: 'B'
}]
student.push({
    age: 40,
    name: 'cc',
    grade: 'C'
})

student.pop()

for (let index = 0; index < student.length; index++) {
    console.log('Student Number', (index + 1))
    console.log('age', student[index].age)
    console.log('name', student[index].name)
    console.log('grade', student[index].grade)
}
*/

/*
function function function function function function function function


let score1 = 55
let score = 65
//ประกาศ func tion
let grade =''
function calculat_grade(score){
    if(score >=80 ){
       grade = 'A'
    } else if (score >= 70) {
    grade = 'B'
    } else if (score >= 60) {
       grade = 'C'
    } else if (score >= 50) {
       grade = 'D'
    } else {
       grade = 'F'
    }
return grade
}

//เรียกใช้ function
let grade1 = calculat_grade(score1)
console.log('Grade', grade1)
*/


/*
array array array array array array array array array


export let score = [20, 30, 40, 50]

for (let index = 0; index < score.length; index++){
    console.log('score',score[index])
    if (score[index] >= 30){
        newScore.push(score[index])
    }
}

newScore.forEach((ns) => {
    console.log('New Score', ns)
})

/*
score[0] = score[0] * 2
score[1] = score[1] * 2
score[2] = score[2] * 2
score[3] = score[3] * 2

score = score.map((s) => {
    return s * 2
})


score.forEach((s) => {
    console.log('forEach Score', s)
})
*/

/*
object function object function  object function 
*/

let students = [
    {
        name:'aa',
        score: 50,
        grade:'D'
    },{
        name:'bb',
        score: 80,
        grade:'A'
    }
]

let student = students.find((s) => {
    if (s.name == 'aa'){
        return true
    }
})

let double_score = student.map((s) => {
    s.score = s.score * 2
})

let hightScore = students.filter((s) => {
    if(s.score >= 120){
        return true
    }
})

console.log(student)

console.log('double_score', double_score)