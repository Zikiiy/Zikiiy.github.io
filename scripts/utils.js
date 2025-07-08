function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
      console.log('copied!');
    }).catch(function(error) {
      console.error('not copied.. error: ', error);
    });
}

function getBirthday() {
    const today = new Date();
    const year = today.getFullYear();
    const birthday = new Date(year, 7, 31); 
    const birthYear = 2008;

    let age = year - birthYear;
    if (today == birthday) age--;

    if (today > birthday) birthday.setFullYear(year + 1);

    const daysUntil = Math.ceil((birthday - today) / (86400000)); 

    return daysUntil >= 0 && daysUntil <= 365 ? `i will be ${age} in ${daysUntil} days` : `it's my birthday! i'm ${age} now`;
}