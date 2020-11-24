export function SaferHTML(templateData) {
  var s = templateData[0]
  for (var i = 1; i < arguments.length; i++) {
    var arg = String(arguments[i])

    // Экранируем спецсимволы в подстановках.
    s += arg.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

    // Не экранируем спецсимволы в шаблоне.
    s += templateData[i]
  }
  return s
}
