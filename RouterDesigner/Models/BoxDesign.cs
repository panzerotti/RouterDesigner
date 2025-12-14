namespace RouterDesigner.Models;

public class BoxDesign
{
    public Guid Id { get; set; } = Guid.NewGuid();

    // Usable routed area in mm
    public double InnerWidthMm { get; set; } = 200;
    public double InnerHeightMm { get; set; } = 120;

    public List<CavityShape> Shapes { get; set; } = new();
}

public abstract class CavityShape
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Type { get; set; } = ""; // "rect", later "circle", etc.

    // Center position in mm
    public double X { get; set; }
    public double Y { get; set; }

    public double RotationDeg { get; set; }
}

public class RectShape : CavityShape
{
    public double WidthMm { get; set; }
    public double HeightMm { get; set; }
}
