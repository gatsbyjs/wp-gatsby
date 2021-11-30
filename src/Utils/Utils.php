<?php

namespace WPGatsby\Utils;

class Utils {

    /**
     * Checks if any of the strings in $substr_array is a substring in the $haystack.
     *
     * @since 2.1.2
     *
     * @param string $haystack
     * @param array $substr_array
     * @param int $offset
     *
     * @return bool
     */
    public static function str_in_substr_array(string $haystack, array $substr_array, int $offset = 0): bool {
        foreach ( $substr_array as $substr ) {
            if ($substr && strpos($haystack, $substr, $offset) !== false ) {
                return true;
            }
        }

        return false;
    }
}
