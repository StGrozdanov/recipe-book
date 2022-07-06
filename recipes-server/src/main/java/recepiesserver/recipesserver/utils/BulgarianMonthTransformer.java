package recepiesserver.recipesserver.utils;

import java.time.Month;
import java.util.LinkedHashMap;
import java.util.Map;

public class BulgarianMonthTransformer {
    public static String translateMonthToBulgarian(Month month) {
       return englishToBulgarianMonthMap().getOrDefault(month.toString(), null);
    }

    private static Map<String, String> englishToBulgarianMonthMap() {
        Map<String, String> months = new LinkedHashMap<>(Map.of(
                "JANUARY", "Януари",
                "FEBRUARY", "Февуари",
                "MARCH", "Март",
                "APRIL", "Април",
                "MAY", "Май",
                "JUNE", "Юни",
                "JULY", "Юли",
                "AUGUST", "Август",
                "SEPTEMBER", "Септември",
                "OCTOBER", "Октомври"
        ));
        months.put("NOVEMBER", "Ноември");
        months.put("DECEMBER", "Декември");
        return months;
    }
}