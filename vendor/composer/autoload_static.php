<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitd5ba67e9c3910011804380f1fed1cebe
{
    public static $files = array (
        '6413a0507de9f277a61292c211ec9a9e' => __DIR__ . '/../..' . '/tests/_data/config.php',
    );

    public static $prefixLengthsPsr4 = array (
        'W' => 
        array (
            'WPGatsby\\' => 9,
        ),
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
        'C' => 
        array (
            'Composer\\Semver\\' => 16,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'WPGatsby\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
        'Composer\\Semver\\' => 
        array (
            0 => __DIR__ . '/..' . '/composer/semver/src',
        ),
    );

    public static $prefixesPsr0 = array (
        'S' => 
        array (
            'SecurityLib' => 
            array (
                0 => __DIR__ . '/..' . '/ircmaxell/security-lib/lib',
            ),
        ),
        'R' => 
        array (
            'RandomLib' => 
            array (
                0 => __DIR__ . '/..' . '/ircmaxell/random-lib/lib',
            ),
        ),
    );

    public static $classMap = array (
        'Composer\\Semver\\Comparator' => __DIR__ . '/..' . '/composer/semver/src/Comparator.php',
        'Composer\\Semver\\Constraint\\AbstractConstraint' => __DIR__ . '/..' . '/composer/semver/src/Constraint/AbstractConstraint.php',
        'Composer\\Semver\\Constraint\\Constraint' => __DIR__ . '/..' . '/composer/semver/src/Constraint/Constraint.php',
        'Composer\\Semver\\Constraint\\ConstraintInterface' => __DIR__ . '/..' . '/composer/semver/src/Constraint/ConstraintInterface.php',
        'Composer\\Semver\\Constraint\\EmptyConstraint' => __DIR__ . '/..' . '/composer/semver/src/Constraint/EmptyConstraint.php',
        'Composer\\Semver\\Constraint\\MultiConstraint' => __DIR__ . '/..' . '/composer/semver/src/Constraint/MultiConstraint.php',
        'Composer\\Semver\\Semver' => __DIR__ . '/..' . '/composer/semver/src/Semver.php',
        'Composer\\Semver\\VersionParser' => __DIR__ . '/..' . '/composer/semver/src/VersionParser.php',
        'Firebase\\JWT\\BeforeValidException' => __DIR__ . '/..' . '/firebase/php-jwt/src/BeforeValidException.php',
        'Firebase\\JWT\\ExpiredException' => __DIR__ . '/..' . '/firebase/php-jwt/src/ExpiredException.php',
        'Firebase\\JWT\\JWK' => __DIR__ . '/..' . '/firebase/php-jwt/src/JWK.php',
        'Firebase\\JWT\\JWT' => __DIR__ . '/..' . '/firebase/php-jwt/src/JWT.php',
        'Firebase\\JWT\\SignatureInvalidException' => __DIR__ . '/..' . '/firebase/php-jwt/src/SignatureInvalidException.php',
        'RandomLib\\AbstractMcryptMixer' => __DIR__ . '/..' . '/ircmaxell/random-lib/lib/RandomLib/AbstractMcryptMixer.php',
        'RandomLib\\AbstractMixer' => __DIR__ . '/..' . '/ircmaxell/random-lib/lib/RandomLib/AbstractMixer.php',
        'RandomLib\\AbstractSource' => __DIR__ . '/..' . '/ircmaxell/random-lib/lib/RandomLib/AbstractSource.php',
        'RandomLib\\Factory' => __DIR__ . '/..' . '/ircmaxell/random-lib/lib/RandomLib/Factory.php',
        'RandomLib\\Generator' => __DIR__ . '/..' . '/ircmaxell/random-lib/lib/RandomLib/Generator.php',
        'RandomLib\\Mixer' => __DIR__ . '/..' . '/ircmaxell/random-lib/lib/RandomLib/Mixer.php',
        'RandomLib\\Mixer\\Hash' => __DIR__ . '/..' . '/ircmaxell/random-lib/lib/RandomLib/Mixer/Hash.php',
        'RandomLib\\Mixer\\McryptRijndael128' => __DIR__ . '/..' . '/ircmaxell/random-lib/lib/RandomLib/Mixer/McryptRijndael128.php',
        'RandomLib\\Mixer\\XorMixer' => __DIR__ . '/..' . '/ircmaxell/random-lib/lib/RandomLib/Mixer/XorMixer.php',
        'RandomLib\\Source' => __DIR__ . '/..' . '/ircmaxell/random-lib/lib/RandomLib/Source.php',
        'RandomLib\\Source\\CAPICOM' => __DIR__ . '/..' . '/ircmaxell/random-lib/lib/RandomLib/Source/CAPICOM.php',
        'RandomLib\\Source\\MTRand' => __DIR__ . '/..' . '/ircmaxell/random-lib/lib/RandomLib/Source/MTRand.php',
        'RandomLib\\Source\\MicroTime' => __DIR__ . '/..' . '/ircmaxell/random-lib/lib/RandomLib/Source/MicroTime.php',
        'RandomLib\\Source\\OpenSSL' => __DIR__ . '/..' . '/ircmaxell/random-lib/lib/RandomLib/Source/OpenSSL.php',
        'RandomLib\\Source\\Rand' => __DIR__ . '/..' . '/ircmaxell/random-lib/lib/RandomLib/Source/Rand.php',
        'RandomLib\\Source\\Random' => __DIR__ . '/..' . '/ircmaxell/random-lib/lib/RandomLib/Source/Random.php',
        'RandomLib\\Source\\RandomBytes' => __DIR__ . '/..' . '/ircmaxell/random-lib/lib/RandomLib/Source/RandomBytes.php',
        'RandomLib\\Source\\Sodium' => __DIR__ . '/..' . '/ircmaxell/random-lib/lib/RandomLib/Source/Sodium.php',
        'RandomLib\\Source\\URandom' => __DIR__ . '/..' . '/ircmaxell/random-lib/lib/RandomLib/Source/URandom.php',
        'RandomLib\\Source\\UniqID' => __DIR__ . '/..' . '/ircmaxell/random-lib/lib/RandomLib/Source/UniqID.php',
        'SecurityLib\\AbstractFactory' => __DIR__ . '/..' . '/ircmaxell/security-lib/lib/SecurityLib/AbstractFactory.php',
        'SecurityLib\\BaseConverter' => __DIR__ . '/..' . '/ircmaxell/security-lib/lib/SecurityLib/BaseConverter.php',
        'SecurityLib\\BigMath' => __DIR__ . '/..' . '/ircmaxell/security-lib/lib/SecurityLib/BigMath.php',
        'SecurityLib\\BigMath\\BCMath' => __DIR__ . '/..' . '/ircmaxell/security-lib/lib/SecurityLib/BigMath/BCMath.php',
        'SecurityLib\\BigMath\\GMP' => __DIR__ . '/..' . '/ircmaxell/security-lib/lib/SecurityLib/BigMath/GMP.php',
        'SecurityLib\\BigMath\\PHPMath' => __DIR__ . '/..' . '/ircmaxell/security-lib/lib/SecurityLib/BigMath/PHPMath.php',
        'SecurityLib\\Enum' => __DIR__ . '/..' . '/ircmaxell/security-lib/lib/SecurityLib/Enum.php',
        'SecurityLib\\Hash' => __DIR__ . '/..' . '/ircmaxell/security-lib/lib/SecurityLib/Hash.php',
        'SecurityLib\\Strength' => __DIR__ . '/..' . '/ircmaxell/security-lib/lib/SecurityLib/Strength.php',
        'SecurityLib\\Util' => __DIR__ . '/..' . '/ircmaxell/security-lib/lib/SecurityLib/Util.php',
        'WPGatsby\\ActionMonitor\\ActionMonitor' => __DIR__ . '/../..' . '/src/ActionMonitor/ActionMonitor.php',
        'WPGatsby\\ActionMonitor\\Monitors\\AcfMonitor' => __DIR__ . '/../..' . '/src/ActionMonitor/Monitors/AcfMonitor.php',
        'WPGatsby\\ActionMonitor\\Monitors\\MediaMonitor' => __DIR__ . '/../..' . '/src/ActionMonitor/Monitors/MediaMonitor.php',
        'WPGatsby\\ActionMonitor\\Monitors\\Monitor' => __DIR__ . '/../..' . '/src/ActionMonitor/Monitors/Monitor.php',
        'WPGatsby\\ActionMonitor\\Monitors\\NavMenuMonitor' => __DIR__ . '/../..' . '/src/ActionMonitor/Monitors/NavMenuMonitor.php',
        'WPGatsby\\ActionMonitor\\Monitors\\PostMonitor' => __DIR__ . '/../..' . '/src/ActionMonitor/Monitors/PostMonitor.php',
        'WPGatsby\\ActionMonitor\\Monitors\\PostTypeMonitor' => __DIR__ . '/../..' . '/src/ActionMonitor/Monitors/PostTypeMonitor.php',
        'WPGatsby\\ActionMonitor\\Monitors\\PreviewMonitor' => __DIR__ . '/../..' . '/src/ActionMonitor/Monitors/Preview.php',
        'WPGatsby\\ActionMonitor\\Monitors\\SettingsMonitor' => __DIR__ . '/../..' . '/src/ActionMonitor/Monitors/SettingsMonitor.php',
        'WPGatsby\\ActionMonitor\\Monitors\\TaxonomyMonitor' => __DIR__ . '/../..' . '/src/ActionMonitor/Monitors/TaxonomyMonitor.php',
        'WPGatsby\\ActionMonitor\\Monitors\\TermMonitor' => __DIR__ . '/../..' . '/src/ActionMonitor/Monitors/TermMonitor.php',
        'WPGatsby\\ActionMonitor\\Monitors\\UserMonitor' => __DIR__ . '/../..' . '/src/ActionMonitor/Monitors/UserMonitor.php',
        'WPGatsby\\Admin\\Settings' => __DIR__ . '/../..' . '/src/Admin/Settings.php',
        'WPGatsby\\GraphQL\\Auth' => __DIR__ . '/../..' . '/src/GraphQL/Auth.php',
        'WPGatsby\\GraphQL\\ParseAuthToken' => __DIR__ . '/../..' . '/src/GraphQL/ParseAuthToken.php',
        'WPGatsby\\Schema\\Schema' => __DIR__ . '/../..' . '/src/Schema/Schema.php',
        'WPGatsby\\Schema\\SiteMeta' => __DIR__ . '/../..' . '/src/Schema/SiteMeta.php',
        'WPGatsby\\Schema\\WPGatsbyWPGraphQLSchemaChanges' => __DIR__ . '/../..' . '/src/Schema/WPGatsbyWPGraphQLSchemaChanges.php',
        'WPGatsby\\ThemeSupport\\ThemeSupport' => __DIR__ . '/../..' . '/src/ThemeSupport/ThemeSupport.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitd5ba67e9c3910011804380f1fed1cebe::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitd5ba67e9c3910011804380f1fed1cebe::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInitd5ba67e9c3910011804380f1fed1cebe::$prefixesPsr0;
            $loader->classMap = ComposerStaticInitd5ba67e9c3910011804380f1fed1cebe::$classMap;

        }, null, ClassLoader::class);
    }
}
