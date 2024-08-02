#include <smd/expected/expected.hpp>

#include <cmath>
#include <iomanip>
#include <iostream>
#include <string_view>

enum class parse_error { invalid_input, overflow };
/*
auto parse_number(std::string_view& str)
    -> smd::expected<double, parse_error> {
    const char* begin = str.data();
    char*       end;
    double      retval = std::strtod(begin, &end);

    if (begin == end)
        return smd::unexpected(parse_error::invalid_input);
    else if (std::isinf(retval))
        return smd::unexpected(parse_error::overflow);

    str.remove_prefix(end - begin);
    return retval;
}

int main() {
    auto process = [](std::string_view str) {
        std::cout << "str: " << std::quoted(str) << ", ";
        if (const auto num = parse_number(str); num.has_value())
            std::cout << "value: " << *num << '\n';
        // If num did not have a value, dereferencing num
        // would cause an undefined behavior, and
        // num.value() would throw std::bad_expected_access.
        // num.value_or(123) uses specified default value 123.
        else if (num.error() == parse_error::invalid_input)
            std::cout << "error: invalid input\n";
        else if (num.error() == parse_error::overflow)
            std::cout << "error: overflow\n";
        else
            std::cout << "unexpected!\n"; // or invoke std::unreachable();
    };

    for (auto src : {"42", "42abc", "meow", "inf"})
        process(src);
}
*/

int main() {
    ;
}
