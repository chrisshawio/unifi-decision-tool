function showOptions(optionId) {
    document.querySelectorAll('.options, .result').forEach(el => el.style.display = 'none');
    document.getElementById(optionId).style.display = 'block';
}

function showResult(resultId) {
    // Show the result div
    document.querySelectorAll('.options, .result').forEach(el => el.style.display = 'none');
    document.getElementById(resultId).style.display = 'block';

    // Filter the table
    const [connectivity, controller, performance] = resultId.split('-');
    const rows = document.querySelectorAll('#gateway-table tbody tr');

    console.log(`Filtering: connectivity=${connectivity}, controller=${controller}, performance=${performance}`);

    rows.forEach(row => {
        const rowConnectivity = row.getAttribute('data-connectivity').split(' ');
        const rowController = row.getAttribute('data-controller').split(' ');
        const rowPerformance = row.getAttribute('data-performance');

        const matchesConnectivity = rowConnectivity.includes(connectivity);
        const matchesController = controller === 'builtin' 
            ? rowController.includes('builtin') 
            : rowController.includes('dedicated') || rowController.includes('self');
        const matchesPerformance = rowPerformance === performance;

        if (matchesConnectivity && matchesController && matchesPerformance) {
            row.classList.remove('hidden');
            console.log(`Showing: ${row.querySelector('td').textContent}`);
        } else {
            row.classList.add('hidden');
            console.log(`Hiding: ${row.querySelector('td').textContent}`);
        }
    });
}