namespace Store.Core.Utils;

public static class NumberUtils
{
    public static bool BeUnique(List<int> list)
    {
        var set = new HashSet<int>();
        foreach (var item in list)
        {
            if (!set.Add(item))
            {
                return false;
            }
        }
        return true;
    }
}