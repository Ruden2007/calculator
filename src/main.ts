type Actions = "+" | "-" | "*" | "/"

interface CalcFormData {
    a: number,
    b: number,
    action: Actions
}

const calcForm = document.querySelector('form.calc') as HTMLFormElement | null
const calcButton = calcForm?.querySelector('button[type="submit"]') as HTMLButtonElement | null
const calcFormResult = document.querySelector('#result') as HTMLInputElement | null

const inputs = calcForm?.querySelectorAll('.inputs input[type="number"]') as NodeListOf<HTMLInputElement>

inputs.forEach(value => value.addEventListener('input', () => {
    if (!(calcButton instanceof HTMLButtonElement)) return false
    calcButton.disabled = !(Array.from(inputs).every(input => input.value.trim() !== ''))
}))


calcForm?.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(calcForm)
    const data: CalcFormData = {
        a: parseFloat(formData.get("a") as string),
        b: parseFloat(formData.get("b") as string),
        action: formData.get("action") as Actions
    }

    let result = 0.00

    switch (data.action) {
        case "+":
            result = data.a + data.b
            break
        case "-":
            result = data.a - data.b
            break
        case "*":
            result = data.a * data.b
            break
        case "/":
            result = data.a / data.b
            break
        default:
            alert("Error, undefined action!")
    }

    result = parseFloat(result.toFixed(16))

    console.log(result)

    if (calcFormResult instanceof HTMLInputElement) calcFormResult.value = result.toString()
})