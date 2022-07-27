package recepiesserver.recipesserver.utils;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.Month;

import org.junit.jupiter.api.Test;

class BulgarianMonthTransformerUtilTest {
    @Test
    void testTranslateMonthToBulgarian() {
        assertEquals("Януари", BulgarianMonthTransformerUtil.translateMonthToBulgarian(Month.JANUARY));
        assertEquals("Февуари", BulgarianMonthTransformerUtil.translateMonthToBulgarian(Month.FEBRUARY));
        assertEquals("Март", BulgarianMonthTransformerUtil.translateMonthToBulgarian(Month.MARCH));
        assertEquals("Април", BulgarianMonthTransformerUtil.translateMonthToBulgarian(Month.APRIL));
        assertEquals("Май", BulgarianMonthTransformerUtil.translateMonthToBulgarian(Month.MAY));
        assertEquals("Юни", BulgarianMonthTransformerUtil.translateMonthToBulgarian(Month.JUNE));
        assertEquals("Юли", BulgarianMonthTransformerUtil.translateMonthToBulgarian(Month.JULY));
        assertEquals("Август", BulgarianMonthTransformerUtil.translateMonthToBulgarian(Month.AUGUST));
        assertEquals("Септември", BulgarianMonthTransformerUtil.translateMonthToBulgarian(Month.SEPTEMBER));
        assertEquals("Октомври", BulgarianMonthTransformerUtil.translateMonthToBulgarian(Month.OCTOBER));
        assertEquals("Ноември", BulgarianMonthTransformerUtil.translateMonthToBulgarian(Month.NOVEMBER));
        assertEquals("Декември", BulgarianMonthTransformerUtil.translateMonthToBulgarian(Month.DECEMBER));
    }
}

