YUI.add('number-tests', function(Y) {
        var ASSERT = Y.Assert,
            ARRAYASSERT = Y.ArrayAssert;
            

        var testParse = new Y.Test.Case({
            name: "Number Parse Tests",
        
            testUndefined: function() {
                var number = Y.DataType.Number.parse();
                ASSERT.isNull(number, "Expected null.");
            },

            testNull: function() {
                var number = Y.DataType.Number.parse(null);
                ASSERT.isNull(number, "Expected null.")
            },
            
            testStrings: function() {
                var number = Y.DataType.Number.parse("0");
                ASSERT.areSame(0, number, "Incorrect number 0.");
                
                number = Y.DataType.Number.parse("1");
                ASSERT.areSame(1, number, "Incorrect number 1.");

                number = Y.DataType.Number.parse("-1");
                ASSERT.areSame(-1, number, "Incorrect number -1.");
            },

            testNumbers: function() {
                var number = Y.DataType.Number.parse(0);
                ASSERT.areSame(0, number, "Incorrect number 0.");

                number = Y.DataType.Number.parse(1);
                ASSERT.areSame(1, number, "Incorrect number 1.");

                number = Y.DataType.Number.parse(-1);
                ASSERT.areSame(-1, number, "Incorrect number -1.");
            }
        });
        
        var testFormat = new Y.Test.Case({
            name: "Number Format Tests",

            testUndefined: function() {
                var output = Y.DataType.Number.format();
                ASSERT.areSame("", output, "Expected empty string.");
            },

            testNull: function() {
                var output = Y.DataType.Number.format(null);
                ASSERT.areSame("", output, "Expected empty string.");
            },

            testStrings: function() {
                var output = Y.DataType.Number.format("0");
                ASSERT.areSame("0", output, "Incorrect output 0.");

                output = Y.DataType.Number.format("1");
                ASSERT.areSame("1", output, "Incorrect output 1.");
                
                output = Y.DataType.Number.format("-1");
                ASSERT.areSame("-1", output, "Incorrect output -1.");
            },

            testNumbers: function() {
                var output = Y.DataType.Number.format(0);
                ASSERT.areSame("0", output, "Incorrect output 0.");

                output = Y.DataType.Number.format(1);
                ASSERT.areSame("1", output, "Incorrect output 1.");

                output = Y.DataType.Number.format(-1);
                ASSERT.areSame("-1", output, "Incorrect output -1.");
            },
            
            testPrefix: function() {
                var output = Y.DataType.Number.format(123, {prefix:"$"});
                ASSERT.areSame("$123", output, "Incorrect prefix.");
                
                output = Y.DataType.Number.format(-123, {prefix:"$"});
                ASSERT.areSame("$-123", output, "Incorrect prefix neg.");
            },
            
            testSuffix: function() {
                var output = Y.DataType.Number.format(123, {suffix:" items"});
                ASSERT.areSame("123 items", output, "Incorrect suffix.");
                
                output = Y.DataType.Number.format(-123, {suffix:" items"});
                ASSERT.areSame("-123 items", output, "Incorrect suffix neg.");
            },
            
            testDecimalPlaces: function() {
                var output = Y.DataType.Number.format(123.123456, {decimalPlaces:5});
                ASSERT.areSame("123.12346", output, "Incorrect decimal rounding to 5 places.");

                output = Y.DataType.Number.format(-123.123456, {decimalPlaces:5});
                ASSERT.areSame("-123.12346", output, "Incorrect decimal rounding to 5 places neg.");

                output = Y.DataType.Number.format(123.123, {decimalPlaces:5});
                ASSERT.areSame("123.12300", output, "Incorrect decimal padding to 5 places.");
                
                output = Y.DataType.Number.format(-123.123, {decimalPlaces:5});
                ASSERT.areSame("-123.12300", output, "Incorrect decimal padding to 5 places neg.");

                output = Y.DataType.Number.format(123, {decimalPlaces:5});
                ASSERT.areSame("123.00000", output, "Incorrect integer padding to 5 places.");

                output = Y.DataType.Number.format(-123, {decimalPlaces:5});
                ASSERT.areSame("-123.00000", output, "Incorrect integer padding to 5 places neg.");

                output = Y.DataType.Number.format(123.127, {decimalPlaces:2});
                ASSERT.areSame("123.13", output, "Incorrect decimal rounding to 2 places up.");
                
                output = Y.DataType.Number.format(-123.127, {decimalPlaces:2});
                ASSERT.areSame("-123.13", output, "Incorrect decimal rounding to 2 places up neg.");

                output = Y.DataType.Number.format(123.123, {decimalPlaces:2});
                ASSERT.areSame("123.12", output, "Incorrect decimal rounding to 2 places down.");
                
                output = Y.DataType.Number.format(-123.123, {decimalPlaces:2});
                ASSERT.areSame("-123.12", output, "Incorrect decimal rounding to 2 places down neg.");

                output = Y.DataType.Number.format(123.123, {decimalPlaces:1});
                ASSERT.areSame("123.1", output, "Incorrect decimal rounding to 1 place.");
                
                output = Y.DataType.Number.format(-123.123, {decimalPlaces:1});
                ASSERT.areSame("-123.1", output, "Incorrect decimal rounding to 1 place neg.");

                output = Y.DataType.Number.format(123.123, {decimalPlaces:0});
                ASSERT.areSame("123", output, "Incorrect decimal rounding to 0 places.");
                
                output = Y.DataType.Number.format(-123.123, {decimalPlaces:0});
                ASSERT.areSame("-123", output, "Incorrect decimal rounding to 0 places neg.");

                output = Y.DataType.Number.format(123.123, {decimalPlaces:-1});
                ASSERT.areSame("123.123", output, "Must ignore decimalPlaces < 0.");
                
                output = Y.DataType.Number.format(-123.123, {decimalPlaces:21});
                ASSERT.areSame("-123.123", output, "Must ignore decimalPlaces > 20.");
            },
            
            testThousandsSeparator: function() {
                var output = Y.DataType.Number.format(123123123, {thousandsSeparator:","});
                ASSERT.areSame("123,123,123", output, "Incorrect thousands separation.");
                
                output = Y.DataType.Number.format(-123123123, {thousandsSeparator:","});
                ASSERT.areSame("-123,123,123", output, "Incorrect thousands separation neg.");
            },

            testComplex: function() {
                var output = Y.DataType.Number.format(123123123.176,{
                        prefix: "&#165;",
                        decimalPlaces:2,
                        thousandsSeparator:".",
                        decimalSeparator:","
                    });
                ASSERT.areSame("&#165;123.123.123,18", output, "Incorrect Yen formatting neg.");
                
                output = Y.DataType.Number.format(-123123123.176,{
                        prefix: "&#165;",
                        decimalPlaces:2,
                        thousandsSeparator:".",
                        decimalSeparator:","
                    });
                ASSERT.areSame("&#165;-123.123.123,18", output, "Incorrect Yen formatting neg.");
            }
        });
            
        
        var suite = new Y.Test.Suite("DataType: Number");
        suite.add(testParse);
        suite.add(testFormat);

        Y.Test.Runner.add(suite);
});
