function openUser() {
    document.getElementById('user').style.display = 'block';
}

function closeUser() {
    document.getElementById('user').style.display = 'none';
}

function logout() {
    if (confirm('Clique em ok para confirmar!')) {
        window.location.href = "html/account.html";
    }
}
