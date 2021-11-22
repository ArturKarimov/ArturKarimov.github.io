(function () {
    let isSign = true;
    let count = 0;
    let calcText = '';
    let plusMinus = true;


    const display = document.querySelector('.display_calc p');


    const equalResult = (calcText) => {

        let arr = calcText.split(' ');

        switch (arr[1]) {
            case '+':
                return Math.round((+arr[0] + +arr[2]) * 100) / 100;
                break;
            case '-':
                return Math.round((+arr[0] - +arr[2]) * 100) / 100;
                break;
            case '*':
                return Math.round((+arr[0] * +arr[2]) * 100) / 100;
                break;
            case '/':
                return Math.round((+arr[0] / +arr[2]) * 100) / 100;
                break;
        }
    };


    const replacePlusMinus = (calcText) => {
        let arr = calcText.split(' ');
        if (plusMinus && arr.length === 1) {
            arr[0] = '-' + arr[0];
            plusMinus = false;
            return arr.join(' ');
        } else if (!plusMinus && arr.length === 1) {
            arr[0] = arr[0].replace(/[-]/g, "");
            plusMinus = true;
            return arr.join(' ');
        }

        if (plusMinus && arr.length > 2) {
            arr[2] = '-' + arr[2];
            plusMinus = false;
            return arr.join(' ');
        } else if (!plusMinus && arr.length > 2) {
            arr[2] = arr[2].replace(/[-]/g, "");
            plusMinus = true;
            return arr.join(' ');
        }
    };


    document.querySelector('.btns').addEventListener('click', (e) => {
            let currentBtn = e.target.textContent;
            if (!e.target.classList.contains('btn')) return;

            if (display.textContent.length >= 9) return;

            if (currentBtn.match(/[0123456789\.]/)) {
                if (isSign === true) {
                    display.textContent = '';
                    isSign = false;
                }

                if (display.textContent.match(/\d{1,}\./g)) {
                    const str = display.textContent.match(/^\d{1,}\./)
                    display.textContent = display.textContent.replace(/^\d{1,}\.\./, str)
                    calcText = calcText.replace(/\d{1,}\.\./, str)
                }


                display.textContent += currentBtn;
                calcText += currentBtn;
            }


            if (currentBtn.match(/^\./)) {
                display.textContent = display.textContent.replace(/^\./, '0.')
                calcText = calcText.replace(/^\./, '0.')
            }


            if (display.textContent.match(/^\d{1,}\.\./)) {
                const str = display.textContent.match(/^\d{1,}\./)
                display.textContent = display.textContent.replace(/^\d{1,}\.\./, str)
                calcText = calcText.replace(/^\d{1,}\.\./, str)
            }


            if (currentBtn.match(/[^0123456789\.=C%p]/)) {
                count += 1;
                if (count === 2) {
                    display.textContent = equalResult(calcText);
                    calcText = equalResult(calcText);
                    count = 1;
                }
                plusMinus = true;
                calcText += ' ' + e.target.textContent + ' ';
                isSign = true;
            }


            if (e.target.classList.contains('cc')) {
                count = 0;
                isSign = true;
                calcText = '';
                display.textContent = '0';
            }


            if (e.target.classList.contains('plus_minus')) {
                calcText = replacePlusMinus(calcText);
                let arr = calcText.split(' ');
                if (arr.length > 2) {
                    display.textContent = arr[2];
                } else {
                    display.textContent = calcText
                }
            }

            if (e.target.classList.contains('percent')) {
                count = 0;
                let arr = calcText.split(' ');
                if (arr.length === 1) {
                    calcText = +arr[0] / 100;
                    display.textContent = calcText;
                }


                calcText = equalResult(calcText) / 100;
                display.textContent = calcText;
                isSign = false;
            }

            if (currentBtn.match('=')) {
                count = 0;
                display.textContent = equalResult(calcText);
                calcText = equalResult(calcText);
                isSign = false;
            }

        }
    );


})();

