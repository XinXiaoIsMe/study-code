export default function (value = 0) {
  return `
  <div class="counter">
    <button class="counter-add">+</button>
    <input type="text" class="counter-input" value="${ value }" />
    <button class="counter-minus">-</button>
  </div>
  `
}