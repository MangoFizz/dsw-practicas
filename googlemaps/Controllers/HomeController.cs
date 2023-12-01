using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using googlemaps.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace googlemaps.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        var Transportes = new Dictionary<string, string>
        {
            {"DRIVING", "Automovil"},
            {"WALKING", "Caminando"},
            {"BICYCLING", "Bicicleta"}
        };
        var selectList = new SelectList(Transportes, "Key", "Value");

        // Iniciamos el modelo a enviar a la vista
        var model = new UbicacionViewModel
        {
            Transportes = selectList,
            Ruta = true
        };
        return View(model);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
