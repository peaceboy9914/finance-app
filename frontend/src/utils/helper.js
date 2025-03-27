export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}


export const getCharName = (fullname) => {
    const words = fullname.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials = initials + words[i][0]
    }

    return initials.toLocaleUpperCase();
}

export const addThousandSeparator = (num) => {
    if(num == null || isNaN(num)) return "";

    const [integerPart, fractionPart] = num.toString().split(".");
    const formatedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return fractionPart ? `${formatedIntegerPart}.${fractionPart}` : formatedIntegerPart;
};

export const prepareExpenseBarChartData = (data = []) => {
    const chartData =  data?.map((item) => ({
        category: item?.category,
        amount: item?.amount,
    }));

    return chartData;
}