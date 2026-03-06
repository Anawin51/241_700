const validateData = (userData) => {
    let errors = [];

    if (!userData.firstName) {
        errors.push('กรุณากรอกชื่อ');
    }

    if (!userData.lastName) {
        errors.push('กรุณากรอกนามสกุล');
    }

    if (!userData.age) {
        errors.push('กรุณากรอกอายุ');
    }

    if (!userData.gender) {
        errors.push('กรุณาเลือกเพศ');
    }

    if (!userData.interests || userData.interests.length === 0) {
        errors.push('กรุณาเลือกงานอดิเรก');
    }

    if (!userData.description) {
        errors.push('กรุณากรอกคำอธิบาย');
    }

    return errors;
}

const submitData = async () => {

    let firstNameDOM = document.querySelector('input[name=firstname]');
    let lastNameDOM = document.querySelector('input[name=lastname]');
    let ageDOM = document.querySelector('input[name=age]');
    let genderDOM = document.querySelector('input[name=gender]:checked');
    let interestDOMs = document.querySelectorAll('input[name=interests]:checked');
    let descriptionDOM = document.querySelector('textarea[name=description]');
    let messageDOM = document.getElementById('message');

    try {

        let interests = [];

        interestDOMs.forEach((item) => {
            interests.push(item.value);
        });

        let userData = {
            firstName: firstNameDOM.value,
            lastName: lastNameDOM.value,
            age: ageDOM.value,
            gender: genderDOM ? genderDOM.value : '',
            interests: interests,
            description: descriptionDOM.value
        };

        console.log('submitData', userData);

        const errors = validateData(userData);

        if (errors.length > 0) {
            throw {
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            }
        }

        // แก้ endpoint ตรงนี้
        const response = await axios.post('http://localhost:8000/users', userData);

        console.log('response', response);

        messageDOM.innerText = 'บันทึกข้อมูลสำเร็จ';
        messageDOM.className = 'message success';

    } catch (error) {

        console.log(error);

        let errorMessage = 'เกิดข้อผิดพลาด';

        if (error.response) {
            errorMessage = error.response.data.message || 'Server Error';
        } else if (error.message) {
            errorMessage = error.message;
        }

        let htmlData = `<div>${errorMessage}</div><ul>`;

        if (error.errors) {
            error.errors.forEach(err => {
                htmlData += `<li>${err}</li>`;
            });
        }

        htmlData += '</ul>';

        messageDOM.innerHTML = htmlData;
        messageDOM.className = 'message danger';
    }
}