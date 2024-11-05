(module
 (type $i32_i32_i32_=>_i32 (func (param i32 i32 i32) (result i32)))
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (type $i32_i32_i32_=>_none (func (param i32 i32 i32)))
 (type $i32_=>_i32 (func (param i32) (result i32)))
 (type $i32_=>_none (func (param i32)))
 (type $none_=>_i32 (func (result i32)))
 (type $none_=>_none (func))
 (type $i32_i32_=>_none (func (param i32 i32)))
 (type $i32_i32_i32_i32_=>_i32 (func (param i32 i32 i32 i32) (result i32)))
 (type $f32_=>_f32 (func (param f32) (result f32)))
 (type $f32_f32_=>_f32 (func (param f32 f32) (result f32)))
 (type $i32_i32_i32_i32_=>_none (func (param i32 i32 i32 i32)))
 (type $i32_f32_f32_=>_i32 (func (param i32 f32 f32) (result i32)))
 (type $f32_i32_i32_i32_=>_f32 (func (param f32 i32 i32 i32) (result f32)))
 (type $i32_i32_i32_=>_f32 (func (param i32 i32 i32) (result f32)))
 (type $i32_=>_f32 (func (param i32) (result f32)))
 (type $f32_f32_f32_f32_=>_i32 (func (param f32 f32 f32 f32) (result i32)))
 (type $i32_i32_f32_f32_=>_i32 (func (param i32 i32 f32 f32) (result i32)))
 (type $f32_f32_=>_i32 (func (param f32 f32) (result i32)))
 (type $none_=>_f64 (func (result f64)))
 (type $i32_i32_=>_f32 (func (param i32 i32) (result f32)))
 (type $i32_i32_f32_=>_none (func (param i32 i32 f32)))
 (type $i32_f32_=>_none (func (param i32 f32)))
 (type $f64_f64_=>_f64 (func (param f64 f64) (result f64)))
 (type $i32_i32_f64_f64_f64_f64_f64_=>_none (func (param i32 i32 f64 f64 f64 f64 f64)))
 (type $i32_f32_f32_=>_f32 (func (param i32 f32 f32) (result f32)))
 (type $i32_f32_f32_=>_none (func (param i32 f32 f32)))
 (type $i32_i32_i32_i32_i32_=>_none (func (param i32 i32 i32 i32 i32)))
 (type $i32_i32_i32_i32_i32_i32_=>_none (func (param i32 i32 i32 i32 i32 i32)))
 (type $i32_f32_f32_f32_=>_i32 (func (param i32 f32 f32 f32) (result i32)))
 (type $i32_i32_f32_f32_f32_=>_i32 (func (param i32 i32 f32 f32 f32) (result i32)))
 (type $i32_f32_f32_i32_=>_i32 (func (param i32 f32 f32 i32) (result i32)))
 (type $i32_f32_i32_i32_i32_f32_i32_=>_none (func (param i32 f32 i32 i32 i32 f32 i32)))
 (type $i32_f32_=>_i32 (func (param i32 f32) (result i32)))
 (type $none_=>_f32 (func (result f32)))
 (type $i32_i32_f32_=>_i32 (func (param i32 i32 f32) (result i32)))
 (type $f32_f32_i32_=>_i32 (func (param f32 f32 i32) (result i32)))
 (type $i32_i32_i32_i32_i32_f32_f32_=>_none (func (param i32 i32 i32 i32 i32 f32 f32)))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (import "env" "seed" (func $~lib/builtins/seed (result f64)))
 (import "env" "trace" (func $~lib/builtins/trace (param i32 i32 f64 f64 f64 f64 f64)))
 (global $logic/constants/SQUARE_OF_TWO (mut f32) (f32.const 0))
 (global $logic/get-id/id (mut i32) (i32.const 0))
 (global $logic/get-random/index (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/total (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/threshold (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/state (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/visitCount (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/pinSpace (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/iter (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/toSpace (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/white (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/fromSpace (mut i32) (i32.const 0))
 (global $~lib/rt/tlsf/ROOT (mut i32) (i32.const 0))
 (global $logic/get-random/lookUpTable (mut i32) (i32.const 0))
 (global $~lib/math/random_seeded (mut i32) (i32.const 0))
 (global $~lib/math/random_state0_32 (mut i32) (i32.const 0))
 (global $~lib/math/random_state1_32 (mut i32) (i32.const 0))
 (global $logic/position-utils/UNITS_OFFSET (mut i32) (i32.const 0))
 (global $logic/obstacles-manager/OBSTACLES_MAP_WIDTH (mut i32) (i32.const 0))
 (global $logic/obstacles-manager/OBSTACLES_MAP_WIDTH_HALF (mut i32) (i32.const 0))
 (global $logic/obstacles-manager/OBSTACLES_MAP_HEIGHT (mut i32) (i32.const 0))
 (global $logic/obstacles-manager/MAP_HEIGHT (mut f32) (f32.const 0))
 (global $logic/obstacles-manager/MAP_WIDTH (mut f32) (f32.const 0))
 (global $logic/obstacles-manager/outerBoundaries (mut i32) (i32.const 0))
 (global $logic/obstacles-manager/innerBoundaries (mut i32) (i32.const 0))
 (global $logic/weapon-details/WEAPON_DETAILS (mut i32) (i32.const 0))
 (global $logic/weapon-details/MAX_POSSIBLE_WEAPON_RANGE (mut f32) (f32.const 0))
 (global $logic/squads-grid-manager/gridMapWidth (mut i32) (i32.const 0))
 (global $logic/squads-grid-manager/gridMapHeight (mut i32) (i32.const 0))
 (global $logic/squads-grid-manager/gridMapWidth_f32 (mut f32) (f32.const 0))
 (global $logic/squads-grid-manager/gridMapHeight_f32 (mut f32) (f32.const 0))
 (global $logic/squads-grid-manager/gridMapScaleX (mut f32) (f32.const 0))
 (global $logic/squads-grid-manager/gridMapScaleY (mut f32) (f32.const 0))
 (global $logic/squads-grid-manager/grid (mut i32) (i32.const 0))
 (global $logic/bullets-manager/bullets_representation (mut i32) (i32.const 1744))
 (global $logic/bullets-manager/bullets_data (mut i32) (i32.const 1824))
 (global $logic/ability-details/ABILITY_DETAILS (mut i32) (i32.const 0))
 (global $logic/squad-details/SQUAD_DETAILS (mut i32) (i32.const 0))
 (global $logic/track-manager/trackPoints (mut i32) (i32.const 2016))
 (global $logic/track-manager/blockingTrackLines (mut i32) (i32.const 2096))
 (global $logic/track-manager/permanentObstaclesGraph (mut i32) (i32.const 0))
 (global $logic/attacker-positions/DISTANCE_BETWEEN_ATTACKERS (mut f32) (f32.const 0))
 (global $logic/attacker-positions/NUMBER_OF_RANGE_BREAKPOINTS (mut i32) (i32.const 0))
 (global $~lib/math/rempio2f_y (mut f64) (f64.const 0))
 (global $logic/hex-positions/HEX_POSITIONS (mut i32) (i32.const 0))
 (global $logic/index/mapWidthGlob (mut f32) (f32.const 0))
 (global $logic/index/mapHeightGlob (mut f32) (f32.const 0))
 (global $logic/index/time (mut i32) (i32.const 0))
 (global $logic/index/Float32Array_ID i32 (i32.const 42))
 (global $logic/index/Uint32Array_ID i32 (i32.const 43))
 (global $logic/index/wasEnemyCreated (mut i32) (i32.const 0))
 (global $logic/index/userFaction (mut i32) (i32.const 0))
 (global $~lib/rt/__rtti_base i32 (i32.const 6176))
 (global $~lib/memory/__stack_pointer (mut i32) (i32.const 23172))
 (memory $0 1)
 (data (i32.const 1036) ",")
 (data (i32.const 1048) "\01\00\00\00\1c\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00l\00e\00n\00g\00t\00h")
 (data (i32.const 1084) "<")
 (data (i32.const 1096) "\01\00\00\00&\00\00\00~\00l\00i\00b\00/\00s\00t\00a\00t\00i\00c\00a\00r\00r\00a\00y\00.\00t\00s")
 (data (i32.const 1148) "<")
 (data (i32.const 1160) "\01\00\00\00(\00\00\00A\00l\00l\00o\00c\00a\00t\00i\00o\00n\00 \00t\00o\00o\00 \00l\00a\00r\00g\00e")
 (data (i32.const 1212) "<")
 (data (i32.const 1224) "\01\00\00\00 \00\00\00~\00l\00i\00b\00/\00r\00t\00/\00i\00t\00c\00m\00s\00.\00t\00s")
 (data (i32.const 1340) "<")
 (data (i32.const 1352) "\01\00\00\00$\00\00\00I\00n\00d\00e\00x\00 \00o\00u\00t\00 \00o\00f\00 \00r\00a\00n\00g\00e")
 (data (i32.const 1404) ",")
 (data (i32.const 1416) "\01\00\00\00\14\00\00\00~\00l\00i\00b\00/\00r\00t\00.\00t\00s")
 (data (i32.const 1484) "<")
 (data (i32.const 1496) "\01\00\00\00\1e\00\00\00~\00l\00i\00b\00/\00r\00t\00/\00t\00l\00s\00f\00.\00t\00s")
 (data (i32.const 1548) "<")
 (data (i32.const 1560) "\01\00\00\00&\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00b\00u\00f\00f\00e\00r\00.\00t\00s")
 (data (i32.const 1612) ",")
 (data (i32.const 1624) "\01\00\00\00\1a\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00.\00t\00s")
 (data (i32.const 1660) "\1c")
 (data (i32.const 1672) "\0d\00\00\00\08\00\00\00\01")
 (data (i32.const 1692) "\1c")
 (data (i32.const 1724) ",")
 (data (i32.const 1736) "\1a\00\00\00\10\00\00\00\b0\06\00\00\b0\06")
 (data (i32.const 1772) "\1c")
 (data (i32.const 1804) ",")
 (data (i32.const 1816) "\1c\00\00\00\10\00\00\00\00\07\00\00\00\07")
 (data (i32.const 1852) "<")
 (data (i32.const 1864) "\01\00\00\00$\00\00\00K\00e\00y\00 \00d\00o\00e\00s\00 \00n\00o\00t\00 \00e\00x\00i\00s\00t")
 (data (i32.const 1916) ",")
 (data (i32.const 1928) "\01\00\00\00\16\00\00\00~\00l\00i\00b\00/\00m\00a\00p\00.\00t\00s")
 (data (i32.const 1964) "\1c")
 (data (i32.const 1996) ",")
 (data (i32.const 2008) "\13\00\00\00\10\00\00\00\c0\07\00\00\c0\07")
 (data (i32.const 2044) "\1c")
 (data (i32.const 2076) ",")
 (data (i32.const 2088) "\08\00\00\00\10\00\00\00\10\08\00\00\10\08")
 (data (i32.const 2124) "\1c")
 (data (i32.const 2156) ",")
 (data (i32.const 2168) "!\00\00\00\10\00\00\00`\08\00\00`\08")
 (data (i32.const 2204) "\1c")
 (data (i32.const 2236) "|")
 (data (i32.const 2248) "\01\00\00\00^\00\00\00E\00l\00e\00m\00e\00n\00t\00 \00t\00y\00p\00e\00 \00m\00u\00s\00t\00 \00b\00e\00 \00n\00u\00l\00l\00a\00b\00l\00e\00 \00i\00f\00 \00a\00r\00r\00a\00y\00 \00i\00s\00 \00h\00o\00l\00e\00y")
 (data (i32.const 2368) ")\15DNn\83\f9\a2\c0\dd4\f5\d1W\'\fcA\90C<\99\95b\dba\c5\bb\de\abcQ\fe")
 (data (i32.const 2412) "\1c")
 (data (i32.const 2424) "#\00\00\00\08\00\00\00\02")
 (data (i32.const 2444) "\1c")
 (data (i32.const 2456) "$\00\00\00\08\00\00\00\03")
 (data (i32.const 2476) "\1c")
 (data (i32.const 2508) ",")
 (data (i32.const 2520) ")\00\00\00\10\00\00\00\c0\t\00\00\c0\t")
 (data (i32.const 2556) "\1c")
 (data (i32.const 2588) "\1c")
 (data (i32.const 2620) "\1c")
 (data (i32.const 2632) "#\00\00\00\08\00\00\00\04")
 (data (i32.const 2652) "\1c")
 (data (i32.const 2684) "\1c")
 (data (i32.const 2716) "<")
 (data (i32.const 2728) "\01\00\00\00$\00\00\00~\00l\00i\00b\00/\00t\00y\00p\00e\00d\00a\00r\00r\00a\00y\00.\00t\00s")
 (data (i32.const 2780) "\1c")
 (data (i32.const 2812) "\1c")
 (data (i32.const 2844) "\1c")
 (data (i32.const 2876) "\1c")
 (data (i32.const 2908) "\1c")
 (data (i32.const 2920) ",\00\00\00\08\00\00\00\05")
 (data (i32.const 2940) "\1c")
 (data (i32.const 2972) "\1c")
 (data (i32.const 3004) "\1c")
 (data (i32.const 3020) "\04\00\00\00\00\00\00\c0")
 (data (i32.const 3036) "\1c")
 (data (i32.const 3052) "\04\00\00\00\00\00@\c0")
 (data (i32.const 3068) "\1c")
 (data (i32.const 3080) "0\00\00\00\08\00\00\00\06")
 (data (i32.const 3100) "\1c")
 (data (i32.const 3116) "\04\00\00\00\00\00\80\bf")
 (data (i32.const 3132) "\1c")
 (data (i32.const 3144) "1\00\00\00\08\00\00\00\07")
 (data (i32.const 3164) "\1c")
 (data (i32.const 3176) "0\00\00\00\08\00\00\00\08")
 (data (i32.const 3196) "\1c")
 (data (i32.const 3228) "\1c")
 (data (i32.const 3260) "\1c")
 (data (i32.const 3272) "3\00\00\00\08\00\00\00\t")
 (data (i32.const 3292) "\1c")
 (data (i32.const 3304) "4\00\00\00\08\00\00\00\n")
 (data (i32.const 3324) "\1c")
 (data (i32.const 3336) "5\00\00\00\08\00\00\00\0b")
 (data (i32.const 3356) "\1c")
 (data (i32.const 3368) "6\00\00\00\08\00\00\00\0c")
 (data (i32.const 3388) "\1c")
 (data (i32.const 3400) "6\00\00\00\08\00\00\00\0d")
 (data (i32.const 3420) "\1c")
 (data (i32.const 3452) "\1c")
 (data (i32.const 3484) "\1c")
 (data (i32.const 3496) "7\00\00\00\08\00\00\00\0e")
 (data (i32.const 3516) "\1c")
 (data (i32.const 3528) "7\00\00\00\08\00\00\00\0f")
 (data (i32.const 3548) "\9c")
 (data (i32.const 3560) "\01\00\00\00\88\00\00\00s\00o\00m\00e\00t\00h\00i\00n\00g\00 \00v\00e\00r\00y\00 \00b\00a\00d\00 \00h\00a\00p\00p\00e\00n\00e\00d\00!\00 \00s\00q\00u\00a\00d\00C\00e\00n\00t\00e\00r\00 \00w\00a\00s\00 \00o\00u\00t\00 \00o\00f\00 \00a\00l\00l\00o\00w\00e\00d\00 \00b\00o\00u\00n\00d\00a\00r\00y")
 (data (i32.const 3708) "\1c")
 (data (i32.const 3740) "\1c")
 (data (i32.const 3772) ",")
 (data (i32.const 3784) "\01\00\00\00\1c\00\00\00A\00r\00r\00a\00y\00 \00i\00s\00 \00e\00m\00p\00t\00y")
 (data (i32.const 3820) "\1c")
 (data (i32.const 3832) "7\00\00\00\08\00\00\00\10")
 (data (i32.const 3852) "<")
 (data (i32.const 3864) "\01\00\00\00\1e\00\00\00u\00n\00e\00x\00p\00e\00c\00t\00e\00d\00 \00n\00u\00l\00l")
 (data (i32.const 3916) ",")
 (data (i32.const 3928) "\01\00\00\00\1a\00\00\00l\00o\00g\00i\00c\00/\00u\00n\00i\00t\00.\00t\00s")
 (data (i32.const 3964) "L")
 (data (i32.const 3976) "\01\00\00\000\00\00\00l\00o\00g\00i\00c\00/\00a\00b\00i\00l\00i\00t\00y\00-\00d\00e\00t\00a\00i\00l\00s\00.\00t\00s")
 (data (i32.const 4044) "\1c")
 (data (i32.const 4056) "7\00\00\00\08\00\00\00\11")
 (data (i32.const 4076) "\1c")
 (data (i32.const 4088) "7\00\00\00\08\00\00\00\12")
 (data (i32.const 4108) "\1c")
 (data (i32.const 4120) ":\00\00\00\08\00\00\00\13")
 (data (i32.const 4140) "\1c")
 (data (i32.const 4152) "5\00\00\00\08\00\00\00\14")
 (data (i32.const 4172) "\1c")
 (data (i32.const 4184) "4\00\00\00\08\00\00\00\15")
 (data (i32.const 4204) "\1c")
 (data (i32.const 4216) "5\00\00\00\08\00\00\00\16")
 (data (i32.const 4236) "\1c")
 (data (i32.const 4248) "6\00\00\00\08\00\00\00\17")
 (data (i32.const 4268) "\1c")
 (data (i32.const 4300) "\1c")
 (data (i32.const 4332) "L")
 (data (i32.const 4344) "\01\00\00\008\00\00\00l\00o\00g\00i\00c\00/\00s\00q\00u\00a\00d\00s\00-\00g\00r\00i\00d\00-\00m\00a\00n\00a\00g\00e\00r\00.\00t\00s")
 (data (i32.const 4412) "\1c")
 (data (i32.const 4424) "<\00\00\00\08\00\00\00\18")
 (data (i32.const 4444) "\1c")
 (data (i32.const 4456) "4\00\00\00\08\00\00\00\19")
 (data (i32.const 4476) "\1c")
 (data (i32.const 4488) "5\00\00\00\08\00\00\00\1a")
 (data (i32.const 4508) "L")
 (data (i32.const 4520) "\01\00\00\000\00\00\00l\00o\00g\00i\00c\00/\00b\00u\00l\00l\00e\00t\00s\00-\00m\00a\00n\00a\00g\00e\00r\00.\00t\00s")
 (data (i32.const 4592) "\be\f3\f8y\eca\f6?\de\aa\8c\80\f7{\d5\bf=\88\afJ\edq\f5?\dbm\c0\a7\f0\be\d2\bf\b0\10\f0\f09\95\f4?g:Q\7f\ae\1e\d0\bf\85\03\b8\b0\95\c9\f3?\e9$\82\a6\d81\cb\bf\a5d\88\0c\19\0d\f3?Xw\c0\nOW\c6\bf\a0\8e\0b{\"^\f2?\00\81\9c\c7+\aa\c1\bf?4\1aJJ\bb\f1?^\0e\8c\cevN\ba\bf\ba\e5\8a\f0X#\f1?\cc\1caZ<\97\b1\bf\a7\00\99A?\95\f0?\1e\0c\e18\f4R\a2\bf\00\00\00\00\00\00\f0?\00\00\00\00\00\00\00\00\acG\9a\fd\8c`\ee?\84Y\f2]\aa\a5\aa?\a0j\02\1f\b3\a4\ec?\b4.6\aaS^\bc?\e6\fcjW6 \eb?\08\db w\e5&\c5?-\aa\a1c\d1\c2\e9?pG\"\0d\86\c2\cb?\edAx\03\e6\86\e8?\e1~\a0\c8\8b\05\d1?bHS\f5\dcg\e7?\t\ee\b6W0\04\d4?")
 (data (i32.const 4860) "\1c")
 (data (i32.const 4872) "=\00\00\00\08\00\00\00\1b")
 (data (i32.const 4892) "\1c")
 (data (i32.const 4904) "7\00\00\00\08\00\00\00\1c")
 (data (i32.const 4924) "\1c")
 (data (i32.const 4936) "4\00\00\00\08\00\00\00\1d")
 (data (i32.const 4956) "\1c")
 (data (i32.const 4968) "5\00\00\00\08\00\00\00\1e")
 (data (i32.const 4988) "\1c")
 (data (i32.const 5000) ">\00\00\00\08\00\00\00\1f")
 (data (i32.const 5020) "\1c")
 (data (i32.const 5032) "?\00\00\00\08\00\00\00 ")
 (data (i32.const 5052) "\1c")
 (data (i32.const 5064) "@\00\00\00\08\00\00\00!")
 (data (i32.const 5084) "\1c")
 (data (i32.const 5096) "A\00\00\00\08\00\00\00\"")
 (data (i32.const 5116) "\1c")
 (data (i32.const 5148) "\1c")
 (data (i32.const 5180) "\1c")
 (data (i32.const 5212) "\1c")
 (data (i32.const 5244) "\1c")
 (data (i32.const 5256) "<\00\00\00\08\00\00\00#")
 (data (i32.const 5276) "\1c")
 (data (i32.const 5308) "\1c")
 (data (i32.const 5340) "\1c")
 (data (i32.const 5372) "\1c")
 (data (i32.const 5404) "\1c")
 (data (i32.const 5416) "B\00\00\00\08\00\00\00$")
 (data (i32.const 5436) "\1c")
 (data (i32.const 5468) "\1c")
 (data (i32.const 5480) "C\00\00\00\08\00\00\00%")
 (data (i32.const 5500) "\1c")
 (data (i32.const 5512) "D\00\00\00\08\00\00\00&")
 (data (i32.const 5532) "\1c")
 (data (i32.const 5544) "E\00\00\00\08\00\00\00\'")
 (data (i32.const 5564) "\1c")
 (data (i32.const 5596) "\1c")
 (data (i32.const 5628) "\1c")
 (data (i32.const 5640) ",\00\00\00\08\00\00\00(")
 (data (i32.const 5660) "\1c")
 (data (i32.const 5672) "F\00\00\00\08\00\00\00)")
 (data (i32.const 5692) "\1c")
 (data (i32.const 5704) "H\00\00\00\08\00\00\00*")
 (data (i32.const 5724) "\1c")
 (data (i32.const 5736) "I\00\00\00\08\00\00\00+")
 (data (i32.const 5756) "\1c")
 (data (i32.const 5772) "\04")
 (data (i32.const 5788) "\1c")
 (data (i32.const 5800) "J\00\00\00\08\00\00\00,")
 (data (i32.const 5820) "\1c")
 (data (i32.const 5832) "K\00\00\00\08\00\00\00-")
 (data (i32.const 5852) "\1c")
 (data (i32.const 5884) "<")
 (data (i32.const 5896) "\01\00\00\00 \00\00\00l\00o\00g\00i\00c\00/\00f\00a\00c\00t\00i\00o\00n\00.\00t\00s")
 (data (i32.const 5948) "\1c")
 (data (i32.const 5980) "\1c")
 (data (i32.const 5992) "D\00\00\00\08\00\00\00.")
 (data (i32.const 6012) "\1c")
 (data (i32.const 6044) "<")
 (data (i32.const 6056) "\01\00\00\00*\00\00\00O\00b\00j\00e\00c\00t\00 \00a\00l\00r\00e\00a\00d\00y\00 \00p\00i\00n\00n\00e\00d")
 (data (i32.const 6108) "<")
 (data (i32.const 6120) "\01\00\00\00(\00\00\00O\00b\00j\00e\00c\00t\00 \00i\00s\00 \00n\00o\00t\00 \00p\00i\00n\00n\00e\00d")
 (data (i32.const 6176) "L\00\00\00 \00\00\00\00\00\00\00 ")
 (data (i32.const 6204) "$\19\00\00\00\00\00\00 \00\00\00\00\00\00\00\04A\00\00\00\00\00\00\04A")
 (data (i32.const 6244) "\02A\00\00\00\00\00\00\02a\00\00\00\00\00\00 \00\00\00\00\00\00\00\10A\12\00\00\00\00\00\02A")
 (data (i32.const 6316) "\02A\00\00\00\00\00\00 \00\00\00\04\00\00\00\02A")
 (data (i32.const 6356) " \00\00\00\00\00\00\00\02A\00\00\00\00\00\00\02a\00\00\00\00\00\00 \00\00\00\00\00\00\00\02A")
 (data (i32.const 6404) "\02A\00\00\00\00\00\00\10A\12\00\00\00\00\00\10A\12\00\00\00\00\00\10A\02\00\00\00\00\00\02A\00\00\00\00\00\00\02A\00\00\00\00\00\00\02\t")
 (data (i32.const 6492) " \00\00\00\00\00\00\00\02A\00\00\00\00\00\00\02A\00\00\00\00\00\00\01\19\00\00\02\00\00\00\01\01\00\00\02")
 (data (i32.const 6548) "\02\19\00\00\00\00\00\00\02A")
 (data (i32.const 6580) "\02\01")
 (data (i32.const 6636) "\02A")
 (data (i32.const 6652) "\02A")
 (data (i32.const 6748) "\02A")
 (table $0 47 funcref)
 (elem $0 (i32.const 1) $start:logic/weapon-details~anonymous|0 $start:logic/get-mean-angle~anonymous|0~anonymous|0 $start:logic/get-mean-angle~anonymous|0 $logic/squad/Squad#updateCenter~anonymous|0 $logic/obstacles-manager/getAllLinesWithinPolygon~anonymous|0 $logic/index/debugObstacles~anonymous|0~anonymous|0 $logic/index/debugObstacles~anonymous|0 $logic/index/debugOuterTrack~anonymous|0 $logic/squads-grid-manager/debugGridNumbers~anonymous|0 $logic/index/updateUniverse~anonymous|0~anonymous|0 $logic/index/updateUniverse~anonymous|0 $logic/squad/Squad#checkMembersCorrectness~anonymous|0 $logic/squad/Squad#keepCoherency~anonymous|0 $logic/squad/Squad#resetState~anonymous|0 $logic/squad/Squad#fixSquadCenter~anonymous|0 $logic/squad/Squad#fixSquadCenter~anonymous|0 $logic/squad/Squad#setTask~anonymous|1 $logic/squad/Squad#setTask~anonymous|1 $logic/faction/Faction#checkSquadsCorrectness~anonymous|0 $logic/index/updateUniverse~anonymous|1 $logic/squads-grid-manager/fillGrid~anonymous|0~anonymous|0 $logic/squads-grid-manager/fillGrid~anonymous|0 $logic/search-for-enemy/searchForEnemy~anonymous|0~anonymous|0~anonymous|0 $logic/squads-grid-manager/getSquadsFromGridByCircle~anonymous|0 $logic/search-for-enemy/searchForEnemy~anonymous|0~anonymous|0 $logic/search-for-enemy/searchForEnemy~anonymous|0 $logic/bullets-manager/updateBullets~anonymous|0 $logic/squad/Squad#update~anonymous|0 $logic/faction/Faction#update~anonymous|0 $logic/index/updateUniverse~anonymous|2 $logic/squad/Squad#getRepresentation~anonymous|0 $logic/faction/Faction#getRepresentation~anonymous|0 $logic/index/getUniverseRepresentation~anonymous|0 $logic/bullets-manager/getBulletsRepresentation~anonymous|0 $logic/squads-grid-manager/getSquadsFromGridByPolygon~anonymous|0 $logic/hex-positions/getSquadsCenter~anonymous|0 $logic/hex-positions/getPositions~anonymous|0 $logic/hex-positions/setAggressorPositions~anonymous|0 $logic/index/moveUnits~anonymous|0 $logic/index/getSelectedUnitsIds~anonymous|0 $logic/index/getSelectedUnitsIds~anonymous|1 $logic/index/getSelectedUnitsIds~anonymous|2~anonymous|0 $logic/index/getSelectedUnitsIds~anonymous|2 $logic/squads-grid-manager/pickCellIndexesInPolygonDebug~anonymous|0 $logic/index/debugSelecting~anonymous|0 $logic/hex-positions/setAggressorPositions~anonymous|0)
 (export "mapWidthGlob" (global $logic/index/mapWidthGlob))
 (export "mapHeightGlob" (global $logic/index/mapHeightGlob))
 (export "Float32Array_ID" (global $logic/index/Float32Array_ID))
 (export "Uint32Array_ID" (global $logic/index/Uint32Array_ID))
 (export "debugObstacles" (func $logic/index/debugObstacles))
 (export "debugOuterTrack" (func $logic/index/debugOuterTrack))
 (export "debugInnerTrack" (func $logic/index/debugInnerTrack))
 (export "getFactoriesInitData" (func $logic/index/getFactoriesInitData))
 (export "debugGrid" (func $logic/index/debugGrid))
 (export "getUniverseRepresentation" (func $logic/index/getUniverseRepresentation))
 (export "createSquad" (func $logic/index/createSquad))
 (export "getSelectedUnitsIds" (func $logic/index/getSelectedUnitsIds))
 (export "debugSelecting" (func $logic/index/debugSelecting))
 (export "__new" (func $~lib/rt/itcms/__new))
 (export "__pin" (func $~lib/rt/itcms/__pin))
 (export "__unpin" (func $~lib/rt/itcms/__unpin))
 (export "__collect" (func $~lib/rt/itcms/__collect))
 (export "__rtti_base" (global $~lib/rt/__rtti_base))
 (export "memory" (memory $0))
 (export "initUniverse" (func $export:logic/index/initUniverse))
 (export "moveUnits" (func $export:logic/index/moveUnits))
 (export "useAbility" (func $export:logic/index/useAbility))
 (export "getAbilitiesCoolDowns" (func $export:logic/index/getAbilitiesCoolDowns))
 (start $~start)
 (func $~lib/rt/itcms/visitRoots
  (local $0 i32)
  (local $1 i32)
  i32.const 2528
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  global.get $logic/index/userFaction
  local.tee $0
  if
   local.get $0
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
  i32.const 1360
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 1056
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 3792
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 2256
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 1872
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 1168
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 6064
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 6128
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  global.get $logic/obstacles-manager/outerBoundaries
  local.tee $0
  if
   local.get $0
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
  global.get $logic/obstacles-manager/innerBoundaries
  local.tee $0
  if
   local.get $0
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
  global.get $logic/squads-grid-manager/grid
  local.tee $0
  if
   local.get $0
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
  global.get $logic/track-manager/trackPoints
  local.tee $0
  if
   local.get $0
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
  global.get $logic/track-manager/blockingTrackLines
  local.tee $0
  if
   local.get $0
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
  global.get $logic/track-manager/permanentObstaclesGraph
  local.tee $0
  if
   local.get $0
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
  global.get $logic/bullets-manager/bullets_representation
  local.tee $0
  if
   local.get $0
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
  global.get $logic/bullets-manager/bullets_data
  local.tee $0
  if
   local.get $0
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
  global.get $logic/hex-positions/HEX_POSITIONS
  local.tee $0
  if
   local.get $0
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
  global.get $logic/ability-details/ABILITY_DETAILS
  local.tee $0
  if
   local.get $0
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
  global.get $logic/position-utils/UNITS_OFFSET
  local.tee $0
  if
   local.get $0
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
  global.get $logic/squad-details/SQUAD_DETAILS
  local.tee $0
  if
   local.get $0
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
  global.get $logic/weapon-details/WEAPON_DETAILS
  local.tee $0
  if
   local.get $0
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
  global.get $logic/get-random/lookUpTable
  local.tee $0
  if
   local.get $0
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
  i32.const 2176
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  global.get $~lib/rt/itcms/pinSpace
  local.tee $1
  i32.load offset=4
  i32.const -4
  i32.and
  local.set $0
  loop $while-continue|0
   local.get $0
   local.get $1
   i32.ne
   if
    local.get $0
    i32.load offset=4
    i32.const 3
    i32.and
    i32.const 3
    i32.ne
    if
     i32.const 0
     i32.const 1232
     i32.const 159
     i32.const 16
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 20
    i32.add
    call $~lib/rt/__visit_members
    local.get $0
    i32.load offset=4
    i32.const -4
    i32.and
    local.set $0
    br $while-continue|0
   end
  end
 )
 (func $~lib/rt/itcms/Object#unlink (param $0 i32)
  (local $1 i32)
  local.get $0
  i32.load offset=4
  i32.const -4
  i32.and
  local.tee $1
  i32.eqz
  if
   i32.const 0
   local.get $0
   i32.const 23172
   i32.lt_u
   local.get $0
   i32.load offset=8
   select
   i32.eqz
   if
    i32.const 0
    i32.const 1232
    i32.const 127
    i32.const 18
    call $~lib/builtins/abort
    unreachable
   end
   return
  end
  local.get $0
  i32.load offset=8
  local.tee $0
  i32.eqz
  if
   i32.const 0
   i32.const 1232
   i32.const 131
   i32.const 16
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  local.get $0
  i32.store offset=8
  local.get $0
  local.get $0
  i32.load offset=4
  i32.const 3
  i32.and
  local.get $1
  i32.or
  i32.store offset=4
 )
 (func $~lib/rt/itcms/Object#makeGray (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/rt/itcms/iter
  local.get $0
  i32.eq
  if
   local.get $0
   i32.load offset=8
   local.tee $1
   i32.eqz
   if
    i32.const 0
    i32.const 1232
    i32.const 147
    i32.const 30
    call $~lib/builtins/abort
    unreachable
   end
   local.get $1
   global.set $~lib/rt/itcms/iter
  end
  local.get $0
  call $~lib/rt/itcms/Object#unlink
  global.get $~lib/rt/itcms/toSpace
  local.set $1
  local.get $0
  i32.load offset=12
  local.tee $2
  i32.const 1
  i32.le_u
  if (result i32)
   i32.const 1
  else
   i32.const 6176
   i32.load
   local.get $2
   i32.lt_u
   if
    i32.const 1360
    i32.const 1424
    i32.const 22
    i32.const 28
    call $~lib/builtins/abort
    unreachable
   end
   local.get $2
   i32.const 3
   i32.shl
   i32.const 6180
   i32.add
   i32.load
   i32.const 32
   i32.and
  end
  local.set $3
  local.get $1
  i32.load offset=8
  local.set $2
  local.get $0
  local.get $1
  global.get $~lib/rt/itcms/white
  i32.eqz
  i32.const 2
  local.get $3
  select
  i32.or
  i32.store offset=4
  local.get $0
  local.get $2
  i32.store offset=8
  local.get $2
  local.get $2
  i32.load offset=4
  i32.const 3
  i32.and
  local.get $0
  i32.or
  i32.store offset=4
  local.get $1
  local.get $0
  i32.store offset=8
 )
 (func $~lib/rt/tlsf/removeBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $1
  i32.load
  local.tee $2
  i32.const 1
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1504
   i32.const 268
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $2
  i32.const -4
  i32.and
  local.tee $2
  i32.const 12
  i32.lt_u
  if
   i32.const 0
   i32.const 1504
   i32.const 270
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $2
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $2
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   local.get $2
   i32.const 1073741820
   local.get $2
   i32.const 1073741820
   i32.lt_u
   select
   local.tee $2
   i32.clz
   i32.sub
   local.tee $4
   i32.const 7
   i32.sub
   local.set $3
   local.get $2
   local.get $4
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $2
  i32.const 16
  i32.lt_u
  local.get $3
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1504
   i32.const 284
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.load offset=8
  local.set $5
  local.get $1
  i32.load offset=4
  local.tee $4
  if
   local.get $4
   local.get $5
   i32.store offset=8
  end
  local.get $5
  if
   local.get $5
   local.get $4
   i32.store offset=4
  end
  local.get $2
  local.get $3
  i32.const 4
  i32.shl
  i32.add
  i32.const 2
  i32.shl
  local.get $0
  i32.add
  i32.load offset=96
  local.get $1
  i32.eq
  if
   local.get $2
   local.get $3
   i32.const 4
   i32.shl
   i32.add
   i32.const 2
   i32.shl
   local.get $0
   i32.add
   local.get $5
   i32.store offset=96
   local.get $5
   i32.eqz
   if
    local.get $3
    i32.const 2
    i32.shl
    local.get $0
    i32.add
    local.tee $1
    i32.load offset=4
    i32.const -2
    local.get $2
    i32.rotl
    i32.and
    local.set $2
    local.get $1
    local.get $2
    i32.store offset=4
    local.get $2
    i32.eqz
    if
     local.get $0
     local.get $0
     i32.load
     i32.const -2
     local.get $3
     i32.rotl
     i32.and
     i32.store
    end
   end
  end
 )
 (func $~lib/rt/tlsf/insertBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $1
  i32.eqz
  if
   i32.const 0
   i32.const 1504
   i32.const 201
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.load
  local.tee $3
  i32.const 1
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1504
   i32.const 203
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.const 4
  i32.add
  local.get $1
  i32.load
  i32.const -4
  i32.and
  i32.add
  local.tee $4
  i32.load
  local.tee $2
  i32.const 1
  i32.and
  if
   local.get $0
   local.get $4
   call $~lib/rt/tlsf/removeBlock
   local.get $1
   local.get $3
   i32.const 4
   i32.add
   local.get $2
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   i32.store
   local.get $1
   i32.const 4
   i32.add
   local.get $1
   i32.load
   i32.const -4
   i32.and
   i32.add
   local.tee $4
   i32.load
   local.set $2
  end
  local.get $3
  i32.const 2
  i32.and
  if
   local.get $1
   i32.const 4
   i32.sub
   i32.load
   local.tee $1
   i32.load
   local.tee $6
   i32.const 1
   i32.and
   i32.eqz
   if
    i32.const 0
    i32.const 1504
    i32.const 221
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   local.get $1
   call $~lib/rt/tlsf/removeBlock
   local.get $1
   local.get $6
   i32.const 4
   i32.add
   local.get $3
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   i32.store
  end
  local.get $4
  local.get $2
  i32.const 2
  i32.or
  i32.store
  local.get $3
  i32.const -4
  i32.and
  local.tee $2
  i32.const 12
  i32.lt_u
  if
   i32.const 0
   i32.const 1504
   i32.const 233
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $2
  local.get $1
  i32.const 4
  i32.add
  i32.add
  local.get $4
  i32.ne
  if
   i32.const 0
   i32.const 1504
   i32.const 234
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $4
  i32.const 4
  i32.sub
  local.get $1
  i32.store
  local.get $2
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $2
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   local.get $2
   i32.const 1073741820
   local.get $2
   i32.const 1073741820
   i32.lt_u
   select
   local.tee $2
   i32.clz
   i32.sub
   local.tee $3
   i32.const 7
   i32.sub
   local.set $5
   local.get $2
   local.get $3
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $2
  i32.const 16
  i32.lt_u
  local.get $5
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1504
   i32.const 251
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $2
  local.get $5
  i32.const 4
  i32.shl
  i32.add
  i32.const 2
  i32.shl
  local.get $0
  i32.add
  i32.load offset=96
  local.set $3
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  local.get $3
  i32.store offset=8
  local.get $3
  if
   local.get $3
   local.get $1
   i32.store offset=4
  end
  local.get $2
  local.get $5
  i32.const 4
  i32.shl
  i32.add
  i32.const 2
  i32.shl
  local.get $0
  i32.add
  local.get $1
  i32.store offset=96
  local.get $0
  local.get $0
  i32.load
  i32.const 1
  local.get $5
  i32.shl
  i32.or
  i32.store
  local.get $5
  i32.const 2
  i32.shl
  local.get $0
  i32.add
  local.tee $0
  local.get $0
  i32.load offset=4
  i32.const 1
  local.get $2
  i32.shl
  i32.or
  i32.store offset=4
 )
 (func $~lib/rt/tlsf/addMemory (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $1
  local.get $2
  i32.gt_u
  if
   i32.const 0
   i32.const 1504
   i32.const 377
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.const 19
  i32.add
  i32.const -16
  i32.and
  i32.const 4
  i32.sub
  local.set $1
  local.get $0
  i32.load offset=1568
  local.tee $4
  if
   local.get $1
   local.get $4
   i32.const 4
   i32.add
   i32.lt_u
   if
    i32.const 0
    i32.const 1504
    i32.const 384
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
   local.get $4
   local.get $1
   i32.const 16
   i32.sub
   i32.eq
   if
    local.get $4
    i32.load
    local.set $3
    local.get $1
    i32.const 16
    i32.sub
    local.set $1
   end
  else
   local.get $1
   local.get $0
   i32.const 1572
   i32.add
   i32.lt_u
   if
    i32.const 0
    i32.const 1504
    i32.const 397
    i32.const 5
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $2
  i32.const -16
  i32.and
  local.get $1
  i32.sub
  local.tee $2
  i32.const 20
  i32.lt_u
  if
   return
  end
  local.get $1
  local.get $3
  i32.const 2
  i32.and
  local.get $2
  i32.const 8
  i32.sub
  local.tee $2
  i32.const 1
  i32.or
  i32.or
  i32.store
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $2
  local.get $1
  i32.const 4
  i32.add
  i32.add
  local.tee $2
  i32.const 2
  i32.store
  local.get $0
  local.get $2
  i32.store offset=1568
  local.get $0
  local.get $1
  call $~lib/rt/tlsf/insertBlock
 )
 (func $~lib/rt/tlsf/initialize
  (local $0 i32)
  (local $1 i32)
  memory.size
  local.tee $1
  i32.const 0
  i32.le_s
  if (result i32)
   i32.const 1
   local.get $1
   i32.sub
   memory.grow
   i32.const 0
   i32.lt_s
  else
   i32.const 0
  end
  if
   unreachable
  end
  i32.const 23184
  i32.const 0
  i32.store
  i32.const 24752
  i32.const 0
  i32.store
  loop $for-loop|0
   local.get $0
   i32.const 23
   i32.lt_u
   if
    local.get $0
    i32.const 2
    i32.shl
    i32.const 23184
    i32.add
    i32.const 0
    i32.store offset=4
    i32.const 0
    local.set $1
    loop $for-loop|1
     local.get $1
     i32.const 16
     i32.lt_u
     if
      local.get $1
      local.get $0
      i32.const 4
      i32.shl
      i32.add
      i32.const 2
      i32.shl
      i32.const 23184
      i32.add
      i32.const 0
      i32.store offset=96
      local.get $1
      i32.const 1
      i32.add
      local.set $1
      br $for-loop|1
     end
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  i32.const 23184
  i32.const 24756
  memory.size
  i32.const 16
  i32.shl
  call $~lib/rt/tlsf/addMemory
  i32.const 23184
  global.set $~lib/rt/tlsf/ROOT
 )
 (func $~lib/rt/tlsf/__free (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  i32.const 23172
  i32.lt_u
  if
   return
  end
  global.get $~lib/rt/tlsf/ROOT
  i32.eqz
  if
   call $~lib/rt/tlsf/initialize
  end
  global.get $~lib/rt/tlsf/ROOT
  local.get $0
  i32.const 4
  i32.sub
  local.set $1
  local.get $0
  i32.const 15
  i32.and
  i32.const 1
  local.get $0
  select
  if (result i32)
   i32.const 1
  else
   local.get $1
   i32.load
   i32.const 1
   i32.and
  end
  if
   i32.const 0
   i32.const 1504
   i32.const 559
   i32.const 3
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  local.get $1
  i32.load
  i32.const 1
  i32.or
  i32.store
  local.get $1
  call $~lib/rt/tlsf/insertBlock
 )
 (func $~lib/rt/itcms/step (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  block $break|0
   block $case2|0
    block $case1|0
     block $case0|0
      global.get $~lib/rt/itcms/state
      br_table $case0|0 $case1|0 $case2|0 $break|0
     end
     i32.const 1
     global.set $~lib/rt/itcms/state
     i32.const 0
     global.set $~lib/rt/itcms/visitCount
     call $~lib/rt/itcms/visitRoots
     global.get $~lib/rt/itcms/toSpace
     global.set $~lib/rt/itcms/iter
     global.get $~lib/rt/itcms/visitCount
     return
    end
    global.get $~lib/rt/itcms/white
    i32.eqz
    local.set $1
    global.get $~lib/rt/itcms/iter
    i32.load offset=4
    i32.const -4
    i32.and
    local.set $0
    loop $while-continue|1
     global.get $~lib/rt/itcms/toSpace
     local.get $0
     i32.ne
     if
      local.get $0
      global.set $~lib/rt/itcms/iter
      local.get $0
      i32.load offset=4
      i32.const 3
      i32.and
      local.get $1
      i32.ne
      if
       local.get $0
       local.get $1
       local.get $0
       i32.load offset=4
       i32.const -4
       i32.and
       i32.or
       i32.store offset=4
       i32.const 0
       global.set $~lib/rt/itcms/visitCount
       local.get $0
       i32.const 20
       i32.add
       call $~lib/rt/__visit_members
       global.get $~lib/rt/itcms/visitCount
       return
      end
      local.get $0
      i32.load offset=4
      i32.const -4
      i32.and
      local.set $0
      br $while-continue|1
     end
    end
    i32.const 0
    global.set $~lib/rt/itcms/visitCount
    call $~lib/rt/itcms/visitRoots
    global.get $~lib/rt/itcms/toSpace
    global.get $~lib/rt/itcms/iter
    i32.load offset=4
    i32.const -4
    i32.and
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     local.set $0
     loop $while-continue|0
      local.get $0
      i32.const 23172
      i32.lt_u
      if
       local.get $0
       i32.load
       local.tee $2
       if
        local.get $2
        call $byn-split-outlined-A$~lib/rt/itcms/__visit
       end
       local.get $0
       i32.const 4
       i32.add
       local.set $0
       br $while-continue|0
      end
     end
     global.get $~lib/rt/itcms/iter
     i32.load offset=4
     i32.const -4
     i32.and
     local.set $0
     loop $while-continue|2
      global.get $~lib/rt/itcms/toSpace
      local.get $0
      i32.ne
      if
       local.get $0
       i32.load offset=4
       i32.const 3
       i32.and
       local.get $1
       i32.ne
       if
        local.get $0
        local.get $1
        local.get $0
        i32.load offset=4
        i32.const -4
        i32.and
        i32.or
        i32.store offset=4
        local.get $0
        i32.const 20
        i32.add
        call $~lib/rt/__visit_members
       end
       local.get $0
       i32.load offset=4
       i32.const -4
       i32.and
       local.set $0
       br $while-continue|2
      end
     end
     global.get $~lib/rt/itcms/fromSpace
     local.set $0
     global.get $~lib/rt/itcms/toSpace
     global.set $~lib/rt/itcms/fromSpace
     local.get $0
     global.set $~lib/rt/itcms/toSpace
     local.get $1
     global.set $~lib/rt/itcms/white
     local.get $0
     i32.load offset=4
     i32.const -4
     i32.and
     global.set $~lib/rt/itcms/iter
     i32.const 2
     global.set $~lib/rt/itcms/state
    end
    global.get $~lib/rt/itcms/visitCount
    return
   end
   global.get $~lib/rt/itcms/iter
   local.tee $0
   global.get $~lib/rt/itcms/toSpace
   i32.ne
   if
    local.get $0
    i32.load offset=4
    local.tee $1
    i32.const -4
    i32.and
    global.set $~lib/rt/itcms/iter
    global.get $~lib/rt/itcms/white
    i32.eqz
    local.get $1
    i32.const 3
    i32.and
    i32.ne
    if
     i32.const 0
     i32.const 1232
     i32.const 228
     i32.const 20
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 23172
    i32.lt_u
    if
     local.get $0
     i32.const 0
     i32.store offset=4
     local.get $0
     i32.const 0
     i32.store offset=8
    else
     global.get $~lib/rt/itcms/total
     local.get $0
     i32.load
     i32.const -4
     i32.and
     i32.const 4
     i32.add
     i32.sub
     global.set $~lib/rt/itcms/total
     local.get $0
     i32.const 4
     i32.add
     call $~lib/rt/tlsf/__free
    end
    i32.const 10
    return
   end
   global.get $~lib/rt/itcms/toSpace
   local.tee $0
   local.get $0
   i32.store offset=4
   local.get $0
   local.get $0
   i32.store offset=8
   i32.const 0
   global.set $~lib/rt/itcms/state
  end
  i32.const 0
 )
 (func $~lib/rt/tlsf/searchBlock (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $1
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $1
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   i32.const 1
   i32.const 27
   local.get $1
   i32.clz
   i32.sub
   i32.shl
   local.get $1
   i32.add
   i32.const 1
   i32.sub
   local.get $1
   local.get $1
   i32.const 536870910
   i32.lt_u
   select
   local.tee $1
   i32.clz
   i32.sub
   local.tee $3
   i32.const 7
   i32.sub
   local.set $2
   local.get $1
   local.get $3
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $1
  i32.const 16
  i32.lt_u
  local.get $2
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1504
   i32.const 330
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $2
  i32.const 2
  i32.shl
  local.get $0
  i32.add
  i32.load offset=4
  i32.const -1
  local.get $1
  i32.shl
  i32.and
  local.tee $1
  if (result i32)
   local.get $1
   i32.ctz
   local.get $2
   i32.const 4
   i32.shl
   i32.add
   i32.const 2
   i32.shl
   local.get $0
   i32.add
   i32.load offset=96
  else
   local.get $0
   i32.load
   i32.const -1
   local.get $2
   i32.const 1
   i32.add
   i32.shl
   i32.and
   local.tee $1
   if (result i32)
    local.get $1
    i32.ctz
    local.tee $1
    i32.const 2
    i32.shl
    local.get $0
    i32.add
    i32.load offset=4
    local.tee $2
    i32.eqz
    if
     i32.const 0
     i32.const 1504
     i32.const 343
     i32.const 18
     call $~lib/builtins/abort
     unreachable
    end
    local.get $2
    i32.ctz
    local.get $1
    i32.const 4
    i32.shl
    i32.add
    i32.const 2
    i32.shl
    local.get $0
    i32.add
    i32.load offset=96
   else
    i32.const 0
   end
  end
 )
 (func $~lib/rt/tlsf/allocateBlock (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $1
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1168
   i32.const 1504
   i32.const 458
   i32.const 29
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.const 12
  local.get $1
  i32.const 19
  i32.add
  i32.const -16
  i32.and
  i32.const 4
  i32.sub
  local.get $1
  i32.const 12
  i32.le_u
  select
  local.tee $3
  call $~lib/rt/tlsf/searchBlock
  local.tee $1
  i32.eqz
  if
   memory.size
   local.tee $1
   i32.const 4
   local.get $0
   i32.load offset=1568
   local.get $1
   i32.const 16
   i32.shl
   i32.const 4
   i32.sub
   i32.ne
   i32.shl
   i32.const 1
   i32.const 27
   local.get $3
   i32.clz
   i32.sub
   i32.shl
   i32.const 1
   i32.sub
   local.get $3
   i32.add
   local.get $3
   local.get $3
   i32.const 536870910
   i32.lt_u
   select
   i32.add
   i32.const 65535
   i32.add
   i32.const -65536
   i32.and
   i32.const 16
   i32.shr_u
   local.tee $2
   local.get $1
   local.get $2
   i32.gt_s
   select
   memory.grow
   i32.const 0
   i32.lt_s
   if
    local.get $2
    memory.grow
    i32.const 0
    i32.lt_s
    if
     unreachable
    end
   end
   local.get $0
   local.get $1
   i32.const 16
   i32.shl
   memory.size
   i32.const 16
   i32.shl
   call $~lib/rt/tlsf/addMemory
   local.get $0
   local.get $3
   call $~lib/rt/tlsf/searchBlock
   local.tee $1
   i32.eqz
   if
    i32.const 0
    i32.const 1504
    i32.const 496
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $1
  i32.load
  i32.const -4
  i32.and
  local.get $3
  i32.lt_u
  if
   i32.const 0
   i32.const 1504
   i32.const 498
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $1
  call $~lib/rt/tlsf/removeBlock
  local.get $1
  i32.load
  local.set $2
  local.get $3
  i32.const 4
  i32.add
  i32.const 15
  i32.and
  if
   i32.const 0
   i32.const 1504
   i32.const 357
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $2
  i32.const -4
  i32.and
  local.get $3
  i32.sub
  local.tee $4
  i32.const 16
  i32.ge_u
  if
   local.get $1
   local.get $2
   i32.const 2
   i32.and
   local.get $3
   i32.or
   i32.store
   local.get $3
   local.get $1
   i32.const 4
   i32.add
   i32.add
   local.tee $2
   local.get $4
   i32.const 4
   i32.sub
   i32.const 1
   i32.or
   i32.store
   local.get $0
   local.get $2
   call $~lib/rt/tlsf/insertBlock
  else
   local.get $1
   local.get $2
   i32.const -2
   i32.and
   i32.store
   local.get $1
   i32.const 4
   i32.add
   local.get $1
   i32.load
   i32.const -4
   i32.and
   i32.add
   local.tee $0
   local.get $0
   i32.load
   i32.const -3
   i32.and
   i32.store
  end
  local.get $1
 )
 (func $~lib/rt/itcms/__new (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  i32.const 1073741804
  i32.ge_u
  if
   i32.const 1168
   i32.const 1232
   i32.const 260
   i32.const 31
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/itcms/total
  global.get $~lib/rt/itcms/threshold
  i32.ge_u
  if
   block $__inlined_func$~lib/rt/itcms/interrupt
    i32.const 2048
    local.set $2
    loop $do-loop|0
     local.get $2
     call $~lib/rt/itcms/step
     i32.sub
     local.set $2
     global.get $~lib/rt/itcms/state
     i32.eqz
     if
      global.get $~lib/rt/itcms/total
      i64.extend_i32_u
      i64.const 200
      i64.mul
      i64.const 100
      i64.div_u
      i32.wrap_i64
      i32.const 1024
      i32.add
      global.set $~lib/rt/itcms/threshold
      br $__inlined_func$~lib/rt/itcms/interrupt
     end
     local.get $2
     i32.const 0
     i32.gt_s
     br_if $do-loop|0
    end
    global.get $~lib/rt/itcms/total
    local.tee $2
    global.get $~lib/rt/itcms/threshold
    i32.sub
    i32.const 1024
    i32.lt_u
    i32.const 10
    i32.shl
    local.get $2
    i32.add
    global.set $~lib/rt/itcms/threshold
   end
  end
  global.get $~lib/rt/tlsf/ROOT
  i32.eqz
  if
   call $~lib/rt/tlsf/initialize
  end
  global.get $~lib/rt/tlsf/ROOT
  local.get $0
  i32.const 16
  i32.add
  call $~lib/rt/tlsf/allocateBlock
  local.tee $2
  local.get $1
  i32.store offset=12
  local.get $2
  local.get $0
  i32.store offset=16
  global.get $~lib/rt/itcms/fromSpace
  local.tee $1
  i32.load offset=8
  local.set $3
  local.get $2
  global.get $~lib/rt/itcms/white
  local.get $1
  i32.or
  i32.store offset=4
  local.get $2
  local.get $3
  i32.store offset=8
  local.get $3
  local.get $3
  i32.load offset=4
  i32.const 3
  i32.and
  local.get $2
  i32.or
  i32.store offset=4
  local.get $1
  local.get $2
  i32.store offset=8
  global.get $~lib/rt/itcms/total
  local.get $2
  i32.load
  i32.const -4
  i32.and
  i32.const 4
  i32.add
  i32.add
  global.set $~lib/rt/itcms/total
  local.get $2
  i32.const 20
  i32.add
  local.tee $2
  local.set $1
  block $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.eqz
   br_if $~lib/util/memory/memset|inlined.0
   local.get $1
   i32.const 0
   i32.store8
   local.get $0
   local.get $1
   i32.add
   local.tee $3
   i32.const 1
   i32.sub
   i32.const 0
   i32.store8
   local.get $0
   i32.const 2
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $1
   i32.const 0
   i32.store8 offset=1
   local.get $1
   i32.const 0
   i32.store8 offset=2
   local.get $3
   i32.const 2
   i32.sub
   i32.const 0
   i32.store8
   local.get $3
   i32.const 3
   i32.sub
   i32.const 0
   i32.store8
   local.get $0
   i32.const 6
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $1
   i32.const 0
   i32.store8 offset=3
   local.get $3
   i32.const 4
   i32.sub
   i32.const 0
   i32.store8
   local.get $0
   i32.const 8
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $1
   i32.const 0
   local.get $1
   i32.sub
   i32.const 3
   i32.and
   local.tee $3
   i32.add
   local.tee $1
   i32.const 0
   i32.store
   local.get $1
   local.get $0
   local.get $3
   i32.sub
   i32.const -4
   i32.and
   local.tee $0
   i32.add
   local.tee $3
   i32.const 4
   i32.sub
   i32.const 0
   i32.store
   local.get $0
   i32.const 8
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $1
   i32.const 0
   i32.store offset=4
   local.get $1
   i32.const 0
   i32.store offset=8
   local.get $3
   i32.const 12
   i32.sub
   i32.const 0
   i32.store
   local.get $3
   i32.const 8
   i32.sub
   i32.const 0
   i32.store
   local.get $0
   i32.const 24
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $1
   i32.const 0
   i32.store offset=12
   local.get $1
   i32.const 0
   i32.store offset=16
   local.get $1
   i32.const 0
   i32.store offset=20
   local.get $1
   i32.const 0
   i32.store offset=24
   local.get $3
   i32.const 28
   i32.sub
   i32.const 0
   i32.store
   local.get $3
   i32.const 24
   i32.sub
   i32.const 0
   i32.store
   local.get $3
   i32.const 20
   i32.sub
   i32.const 0
   i32.store
   local.get $3
   i32.const 16
   i32.sub
   i32.const 0
   i32.store
   local.get $1
   local.get $1
   i32.const 4
   i32.and
   i32.const 24
   i32.add
   local.tee $3
   i32.add
   local.set $1
   local.get $0
   local.get $3
   i32.sub
   local.set $0
   loop $while-continue|0
    local.get $0
    i32.const 32
    i32.ge_u
    if
     local.get $1
     i64.const 0
     i64.store
     local.get $1
     i64.const 0
     i64.store offset=8
     local.get $1
     i64.const 0
     i64.store offset=16
     local.get $1
     i64.const 0
     i64.store offset=24
     local.get $0
     i32.const 32
     i32.sub
     local.set $0
     local.get $1
     i32.const 32
     i32.add
     local.set $1
     br $while-continue|0
    end
   end
  end
  local.get $2
 )
 (func $~lib/util/memory/memcpy (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  loop $while-continue|0
   local.get $1
   i32.const 3
   i32.and
   i32.const 0
   local.get $2
   select
   if
    local.get $0
    local.tee $3
    i32.const 1
    i32.add
    local.set $0
    local.get $1
    local.tee $4
    i32.const 1
    i32.add
    local.set $1
    local.get $3
    local.get $4
    i32.load8_u
    i32.store8
    local.get $2
    i32.const 1
    i32.sub
    local.set $2
    br $while-continue|0
   end
  end
  local.get $0
  i32.const 3
  i32.and
  i32.eqz
  if
   loop $while-continue|1
    local.get $2
    i32.const 16
    i32.ge_u
    if
     local.get $0
     local.get $1
     i32.load
     i32.store
     local.get $0
     local.get $1
     i32.load offset=4
     i32.store offset=4
     local.get $0
     local.get $1
     i32.load offset=8
     i32.store offset=8
     local.get $0
     local.get $1
     i32.load offset=12
     i32.store offset=12
     local.get $1
     i32.const 16
     i32.add
     local.set $1
     local.get $0
     i32.const 16
     i32.add
     local.set $0
     local.get $2
     i32.const 16
     i32.sub
     local.set $2
     br $while-continue|1
    end
   end
   local.get $2
   i32.const 8
   i32.and
   if
    local.get $0
    local.get $1
    i32.load
    i32.store
    local.get $0
    local.get $1
    i32.load offset=4
    i32.store offset=4
    local.get $1
    i32.const 8
    i32.add
    local.set $1
    local.get $0
    i32.const 8
    i32.add
    local.set $0
   end
   local.get $2
   i32.const 4
   i32.and
   if
    local.get $0
    local.get $1
    i32.load
    i32.store
    local.get $1
    i32.const 4
    i32.add
    local.set $1
    local.get $0
    i32.const 4
    i32.add
    local.set $0
   end
   local.get $2
   i32.const 2
   i32.and
   if
    local.get $0
    local.get $1
    i32.load16_u
    i32.store16
    local.get $1
    i32.const 2
    i32.add
    local.set $1
    local.get $0
    i32.const 2
    i32.add
    local.set $0
   end
   local.get $2
   i32.const 1
   i32.and
   if
    local.get $0
    local.get $1
    i32.load8_u
    i32.store8
   end
   return
  end
  local.get $2
  i32.const 32
  i32.ge_u
  if
   block $break|2
    block $case2|2
     block $case1|2
      block $case0|2
       local.get $0
       i32.const 3
       i32.and
       i32.const 1
       i32.sub
       br_table $case0|2 $case1|2 $case2|2 $break|2
      end
      local.get $1
      i32.load
      local.set $5
      local.get $0
      local.get $1
      i32.load8_u
      i32.store8
      local.get $0
      local.get $1
      i32.load8_u offset=1
      i32.store8 offset=1
      local.get $0
      i32.const 2
      i32.add
      local.tee $3
      i32.const 1
      i32.add
      local.set $0
      local.get $1
      i32.const 2
      i32.add
      local.tee $4
      i32.const 1
      i32.add
      local.set $1
      local.get $3
      local.get $4
      i32.load8_u
      i32.store8
      local.get $2
      i32.const 3
      i32.sub
      local.set $2
      loop $while-continue|3
       local.get $2
       i32.const 17
       i32.ge_u
       if
        local.get $0
        local.get $1
        i32.load offset=1
        local.tee $3
        i32.const 8
        i32.shl
        local.get $5
        i32.const 24
        i32.shr_u
        i32.or
        i32.store
        local.get $0
        local.get $1
        i32.load offset=5
        local.tee $4
        i32.const 8
        i32.shl
        local.get $3
        i32.const 24
        i32.shr_u
        i32.or
        i32.store offset=4
        local.get $0
        local.get $1
        i32.load offset=9
        local.tee $3
        i32.const 8
        i32.shl
        local.get $4
        i32.const 24
        i32.shr_u
        i32.or
        i32.store offset=8
        local.get $0
        local.get $1
        i32.load offset=13
        local.tee $5
        i32.const 8
        i32.shl
        local.get $3
        i32.const 24
        i32.shr_u
        i32.or
        i32.store offset=12
        local.get $1
        i32.const 16
        i32.add
        local.set $1
        local.get $0
        i32.const 16
        i32.add
        local.set $0
        local.get $2
        i32.const 16
        i32.sub
        local.set $2
        br $while-continue|3
       end
      end
      br $break|2
     end
     local.get $1
     i32.load
     local.set $5
     local.get $0
     local.get $1
     i32.load8_u
     i32.store8
     local.get $0
     local.tee $3
     i32.const 2
     i32.add
     local.set $0
     local.get $1
     local.tee $4
     i32.const 2
     i32.add
     local.set $1
     local.get $3
     local.get $4
     i32.load8_u offset=1
     i32.store8 offset=1
     local.get $2
     i32.const 2
     i32.sub
     local.set $2
     loop $while-continue|4
      local.get $2
      i32.const 18
      i32.ge_u
      if
       local.get $0
       local.get $1
       i32.load offset=2
       local.tee $3
       i32.const 16
       i32.shl
       local.get $5
       i32.const 16
       i32.shr_u
       i32.or
       i32.store
       local.get $0
       local.get $1
       i32.load offset=6
       local.tee $4
       i32.const 16
       i32.shl
       local.get $3
       i32.const 16
       i32.shr_u
       i32.or
       i32.store offset=4
       local.get $0
       local.get $1
       i32.load offset=10
       local.tee $3
       i32.const 16
       i32.shl
       local.get $4
       i32.const 16
       i32.shr_u
       i32.or
       i32.store offset=8
       local.get $0
       local.get $1
       i32.load offset=14
       local.tee $5
       i32.const 16
       i32.shl
       local.get $3
       i32.const 16
       i32.shr_u
       i32.or
       i32.store offset=12
       local.get $1
       i32.const 16
       i32.add
       local.set $1
       local.get $0
       i32.const 16
       i32.add
       local.set $0
       local.get $2
       i32.const 16
       i32.sub
       local.set $2
       br $while-continue|4
      end
     end
     br $break|2
    end
    local.get $1
    i32.load
    local.set $5
    local.get $0
    local.tee $3
    i32.const 1
    i32.add
    local.set $0
    local.get $1
    local.tee $4
    i32.const 1
    i32.add
    local.set $1
    local.get $3
    local.get $4
    i32.load8_u
    i32.store8
    local.get $2
    i32.const 1
    i32.sub
    local.set $2
    loop $while-continue|5
     local.get $2
     i32.const 19
     i32.ge_u
     if
      local.get $0
      local.get $1
      i32.load offset=3
      local.tee $3
      i32.const 24
      i32.shl
      local.get $5
      i32.const 8
      i32.shr_u
      i32.or
      i32.store
      local.get $0
      local.get $1
      i32.load offset=7
      local.tee $4
      i32.const 24
      i32.shl
      local.get $3
      i32.const 8
      i32.shr_u
      i32.or
      i32.store offset=4
      local.get $0
      local.get $1
      i32.load offset=11
      local.tee $3
      i32.const 24
      i32.shl
      local.get $4
      i32.const 8
      i32.shr_u
      i32.or
      i32.store offset=8
      local.get $0
      local.get $1
      i32.load offset=15
      local.tee $5
      i32.const 24
      i32.shl
      local.get $3
      i32.const 8
      i32.shr_u
      i32.or
      i32.store offset=12
      local.get $1
      i32.const 16
      i32.add
      local.set $1
      local.get $0
      i32.const 16
      i32.add
      local.set $0
      local.get $2
      i32.const 16
      i32.sub
      local.set $2
      br $while-continue|5
     end
    end
   end
  end
  local.get $2
  i32.const 16
  i32.and
  if
   local.get $0
   local.get $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $3
   i32.load8_u
   i32.store8
   local.get $3
   i32.const 2
   i32.add
   local.set $1
   local.get $0
   local.get $3
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.set $0
  end
  local.get $2
  i32.const 8
  i32.and
  if
   local.get $0
   local.get $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $3
   i32.load8_u
   i32.store8
   local.get $3
   i32.const 2
   i32.add
   local.set $1
   local.get $0
   local.get $3
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.set $0
  end
  local.get $2
  i32.const 4
  i32.and
  if
   local.get $0
   local.get $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $3
   i32.load8_u
   i32.store8
   local.get $3
   i32.const 2
   i32.add
   local.set $1
   local.get $0
   local.get $3
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.set $0
  end
  local.get $2
  i32.const 2
  i32.and
  if
   local.get $0
   local.get $1
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 2
   i32.add
   local.set $0
   local.get $1
   local.tee $4
   i32.const 2
   i32.add
   local.set $1
   local.get $3
   local.get $4
   i32.load8_u offset=1
   i32.store8 offset=1
  end
  local.get $2
  i32.const 1
  i32.and
  if
   local.get $0
   local.get $1
   i32.load8_u
   i32.store8
  end
 )
 (func $~lib/memory/memory.copy (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  block $~lib/util/memory/memmove|inlined.0
   local.get $2
   local.set $4
   local.get $0
   local.get $1
   i32.eq
   br_if $~lib/util/memory/memmove|inlined.0
   local.get $1
   local.get $0
   i32.sub
   local.get $4
   i32.sub
   i32.const 0
   local.get $4
   i32.const 1
   i32.shl
   i32.sub
   i32.le_u
   if
    local.get $0
    local.get $1
    local.get $4
    call $~lib/util/memory/memcpy
    br $~lib/util/memory/memmove|inlined.0
   end
   local.get $0
   local.get $1
   i32.lt_u
   if
    local.get $1
    i32.const 7
    i32.and
    local.get $0
    i32.const 7
    i32.and
    i32.eq
    if
     loop $while-continue|0
      local.get $0
      i32.const 7
      i32.and
      if
       local.get $4
       i32.eqz
       br_if $~lib/util/memory/memmove|inlined.0
       local.get $4
       i32.const 1
       i32.sub
       local.set $4
       local.get $0
       local.tee $2
       i32.const 1
       i32.add
       local.set $0
       local.get $1
       local.tee $3
       i32.const 1
       i32.add
       local.set $1
       local.get $2
       local.get $3
       i32.load8_u
       i32.store8
       br $while-continue|0
      end
     end
     loop $while-continue|1
      local.get $4
      i32.const 8
      i32.ge_u
      if
       local.get $0
       local.get $1
       i64.load
       i64.store
       local.get $4
       i32.const 8
       i32.sub
       local.set $4
       local.get $0
       i32.const 8
       i32.add
       local.set $0
       local.get $1
       i32.const 8
       i32.add
       local.set $1
       br $while-continue|1
      end
     end
    end
    loop $while-continue|2
     local.get $4
     if
      local.get $0
      local.tee $2
      i32.const 1
      i32.add
      local.set $0
      local.get $1
      local.tee $3
      i32.const 1
      i32.add
      local.set $1
      local.get $2
      local.get $3
      i32.load8_u
      i32.store8
      local.get $4
      i32.const 1
      i32.sub
      local.set $4
      br $while-continue|2
     end
    end
   else
    local.get $1
    i32.const 7
    i32.and
    local.get $0
    i32.const 7
    i32.and
    i32.eq
    if
     loop $while-continue|3
      local.get $0
      local.get $4
      i32.add
      i32.const 7
      i32.and
      if
       local.get $4
       i32.eqz
       br_if $~lib/util/memory/memmove|inlined.0
       local.get $4
       i32.const 1
       i32.sub
       local.tee $4
       local.get $0
       i32.add
       local.get $1
       local.get $4
       i32.add
       i32.load8_u
       i32.store8
       br $while-continue|3
      end
     end
     loop $while-continue|4
      local.get $4
      i32.const 8
      i32.ge_u
      if
       local.get $4
       i32.const 8
       i32.sub
       local.tee $4
       local.get $0
       i32.add
       local.get $1
       local.get $4
       i32.add
       i64.load
       i64.store
       br $while-continue|4
      end
     end
    end
    loop $while-continue|5
     local.get $4
     if
      local.get $4
      i32.const 1
      i32.sub
      local.tee $4
      local.get $0
      i32.add
      local.get $1
      local.get $4
      i32.add
      i32.load8_u
      i32.store8
      br $while-continue|5
     end
    end
   end
  end
 )
 (func $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset (param $0 i32) (param $1 i32) (param $2 i32)
  local.get $1
  i32.const 2
  i32.shl
  local.get $0
  i32.add
  local.get $2
  i32.store
  local.get $2
  if
   local.get $0
   local.get $2
   i32.const 1
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
 )
 (func $start:logic/position-utils
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 120
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $0
  i64.const 0
  i64.store
  local.get $0
  i64.const 0
  i64.store offset=8
  local.get $0
  i64.const 0
  i64.store offset=16
  local.get $0
  i64.const 0
  i64.store offset=24
  local.get $0
  i64.const 0
  i64.store offset=32
  local.get $0
  i64.const 0
  i64.store offset=40
  local.get $0
  i64.const 0
  i64.store offset=48
  local.get $0
  i64.const 0
  i64.store offset=56
  local.get $0
  i64.const 0
  i64.store offset=64
  local.get $0
  i64.const 0
  i64.store offset=72
  local.get $0
  i64.const 0
  i64.store offset=80
  local.get $0
  i64.const 0
  i64.store offset=88
  local.get $0
  i64.const 0
  i64.store offset=96
  local.get $0
  i64.const 0
  i64.store offset=104
  local.get $0
  i64.const 0
  i64.store offset=112
  local.get $0
  i32.const 28
  i32.const 6
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.const 5
  call $~lib/rt/itcms/__new
  local.tee $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=8
  local.get $2
  f32.const 0
  f32.store
  local.get $2
  f32.const 0
  f32.store offset=4
  local.get $1
  i32.const 0
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  local.get $0
  i32.const 0
  local.get $1
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.const 5
  call $~lib/rt/itcms/__new
  local.tee $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=12
  local.get $2
  f32.const -28
  f32.store
  local.get $2
  f32.const -27
  f32.store offset=4
  local.get $1
  i32.const 0
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=16
  local.get $2
  f32.const 29
  f32.store
  local.get $2
  f32.const 28
  f32.store offset=4
  local.get $1
  i32.const 1
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  local.get $0
  i32.const 1
  local.get $1
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.const 5
  call $~lib/rt/itcms/__new
  local.tee $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=20
  local.get $2
  f32.const -38
  f32.store
  local.get $2
  f32.const -37
  f32.store offset=4
  local.get $1
  i32.const 0
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=24
  local.get $2
  f32.const 52
  f32.store
  local.get $2
  f32.const -14
  f32.store offset=4
  local.get $1
  i32.const 1
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=28
  local.get $2
  f32.const -13
  f32.store
  local.get $2
  f32.const 52
  f32.store offset=4
  local.get $1
  i32.const 2
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  local.get $0
  i32.const 2
  local.get $1
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.const 5
  call $~lib/rt/itcms/__new
  local.tee $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=32
  local.get $2
  f32.const -43
  f32.store
  local.get $2
  f32.const -41
  f32.store offset=4
  local.get $1
  i32.const 0
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=36
  local.get $2
  f32.const 42
  f32.store
  local.get $2
  f32.const -43
  f32.store offset=4
  local.get $1
  i32.const 1
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=40
  local.get $2
  f32.const 44
  f32.store
  local.get $2
  f32.const 42
  f32.store offset=4
  local.get $1
  i32.const 2
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=44
  local.get $2
  f32.const -41
  f32.store
  local.get $2
  f32.const 44
  f32.store offset=4
  local.get $1
  i32.const 3
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  local.get $0
  i32.const 3
  local.get $1
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.const 5
  call $~lib/rt/itcms/__new
  local.tee $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=48
  local.get $2
  f32.const -45
  f32.store
  local.get $2
  f32.const -44
  f32.store offset=4
  local.get $1
  i32.const 0
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=52
  local.get $2
  f32.const 29
  f32.store
  local.get $2
  f32.const -57
  f32.store offset=4
  local.get $1
  i32.const 1
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=56
  local.get $2
  f32.const 64
  f32.store
  local.get $2
  f32.const 10
  f32.store offset=4
  local.get $1
  i32.const 2
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=60
  local.get $2
  f32.const 11
  f32.store
  local.get $2
  f32.const 64
  f32.store offset=4
  local.get $1
  i32.const 3
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=64
  local.get $2
  f32.const -56
  f32.store
  local.get $2
  f32.const 30
  f32.store offset=4
  local.get $1
  i32.const 4
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  local.get $0
  i32.const 4
  local.get $1
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.const 5
  call $~lib/rt/itcms/__new
  local.tee $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=68
  local.get $2
  f32.const -47
  f32.store
  local.get $2
  f32.const -46
  f32.store offset=4
  local.get $1
  i32.const 0
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=72
  local.get $2
  f32.const 17
  f32.store
  local.get $2
  f32.const -64
  f32.store offset=4
  local.get $1
  i32.const 1
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=76
  local.get $2
  f32.const 65
  f32.store
  local.get $2
  f32.const -18
  f32.store offset=4
  local.get $1
  i32.const 2
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=80
  local.get $2
  f32.const 48
  f32.store
  local.get $2
  f32.const 47
  f32.store offset=4
  local.get $1
  i32.const 3
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=84
  local.get $2
  f32.const -16
  f32.store
  local.get $2
  f32.const 65
  f32.store offset=4
  local.get $1
  i32.const 4
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=88
  local.get $2
  f32.const -64
  f32.store
  local.get $2
  f32.const 19
  f32.store offset=4
  local.get $1
  i32.const 5
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  local.get $0
  i32.const 5
  local.get $1
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 28
  i32.const 5
  call $~lib/rt/itcms/__new
  local.tee $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=92
  local.get $2
  f32.const 0
  f32.store
  local.get $2
  f32.const 0
  f32.store offset=4
  local.get $1
  i32.const 0
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=96
  local.get $2
  f32.const -49
  f32.store
  local.get $2
  f32.const -47
  f32.store offset=4
  local.get $1
  i32.const 1
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=100
  local.get $2
  f32.const 17
  f32.store
  local.get $2
  f32.const -66
  f32.store offset=4
  local.get $1
  i32.const 2
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=104
  local.get $2
  f32.const 66
  f32.store
  local.get $2
  f32.const -18
  f32.store offset=4
  local.get $1
  i32.const 3
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=108
  local.get $2
  f32.const 50
  f32.store
  local.get $2
  f32.const 48
  f32.store offset=4
  local.get $1
  i32.const 4
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=112
  local.get $2
  f32.const -16
  f32.store
  local.get $2
  f32.const 67
  f32.store offset=4
  local.get $1
  i32.const 5
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=116
  local.get $2
  f32.const -65
  f32.store
  local.get $2
  f32.const 19
  f32.store offset=4
  local.get $1
  i32.const 6
  local.get $2
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  local.get $0
  i32.const 6
  local.get $1
  call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
  local.get $0
  global.set $logic/position-utils/UNITS_OFFSET
  global.get $~lib/memory/__stack_pointer
  i32.const 120
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/array/ensureCapacity (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $0
  i32.load offset=8
  local.tee $4
  i32.const 2
  i32.shr_u
  local.get $1
  i32.lt_u
  if
   local.get $1
   i32.const 268435455
   i32.gt_u
   if
    i32.const 1056
    i32.const 1632
    i32.const 19
    i32.const 48
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   i32.load
   local.set $3
   local.get $1
   i32.const 8
   local.get $1
   i32.const 8
   i32.gt_u
   select
   i32.const 2
   i32.shl
   local.set $1
   block $__inlined_func$~lib/rt/itcms/__renew
    local.get $2
    if (result i32)
     local.get $4
     i32.const 1
     i32.shl
     local.tee $2
     i32.const 1073741820
     local.get $2
     i32.const 1073741820
     i32.lt_u
     select
     local.tee $2
     local.get $1
     local.get $1
     local.get $2
     i32.lt_u
     select
    else
     local.get $1
    end
    local.tee $2
    local.get $3
    i32.const 20
    i32.sub
    local.tee $4
    i32.load
    i32.const -4
    i32.and
    i32.const 16
    i32.sub
    i32.le_u
    if
     local.get $4
     local.get $2
     i32.store offset=16
     local.get $3
     local.set $1
     br $__inlined_func$~lib/rt/itcms/__renew
    end
    local.get $2
    local.get $4
    i32.load offset=12
    call $~lib/rt/itcms/__new
    local.tee $1
    local.get $3
    local.get $2
    local.get $4
    i32.load offset=16
    local.tee $4
    local.get $2
    local.get $4
    i32.lt_u
    select
    call $~lib/memory/memory.copy
   end
   local.get $1
   local.get $3
   i32.ne
   if
    local.get $0
    local.get $1
    i32.store
    local.get $0
    local.get $1
    i32.store offset=4
    local.get $1
    if
     local.get $0
     local.get $1
     i32.const 0
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
   end
   local.get $0
   local.get $2
   i32.store offset=8
  end
 )
 (func $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset (param $0 i32) (param $1 i32) (param $2 i32)
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  local.get $2
  i32.store
  local.get $2
  if
   local.get $0
   local.get $2
   i32.const 1
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
 )
 (func $~lib/array/Array<logic/weapon-details/WeaponDetails>#__set (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  local.get $0
  i32.load offset=12
  local.get $1
  i32.le_u
  if
   local.get $1
   i32.const 0
   i32.lt_s
   if
    i32.const 1360
    i32.const 1632
    i32.const 130
    i32.const 22
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   local.get $1
   i32.const 1
   i32.add
   local.tee $3
   i32.const 1
   call $~lib/array/ensureCapacity
   local.get $0
   local.get $3
   i32.store offset=12
  end
  local.get $0
  local.get $1
  local.get $2
  call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
 )
 (func $start:logic/weapon-details~anonymous|0 (param $0 f32) (param $1 i32) (param $2 i32) (param $3 i32) (result f32)
  local.get $1
  f32.load offset=4
  local.get $0
  f32.max
 )
 (func $start:logic/bullets-manager
  (local $0 i32)
  (local $1 i32)
  (local $2 f32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   local.tee $3
   i64.const 0
   i64.store
   local.get $3
   i64.const 0
   i64.store offset=8
   local.get $3
   i32.const 0
   i32.store offset=16
   local.get $3
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   local.tee $3
   i32.const 0
   i32.store
   local.get $3
   i32.const 24
   i32.const 11
   call $~lib/rt/itcms/__new
   local.tee $3
   i32.store
   local.get $3
   i32.const 16
   call $~lib/arraybuffer/ArrayBuffer#constructor
   local.tee $4
   i32.store
   local.get $4
   if
    local.get $3
    local.get $4
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   local.get $3
   i32.const 3
   i32.store offset=4
   local.get $3
   i32.const 48
   call $~lib/arraybuffer/ArrayBuffer#constructor
   local.tee $4
   i32.store offset=8
   local.get $4
   if
    local.get $3
    local.get $4
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   local.get $3
   i32.const 4
   i32.store offset=12
   local.get $3
   i32.const 0
   i32.store offset=16
   local.get $3
   i32.const 0
   i32.store offset=20
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $3
   global.set $logic/weapon-details/WEAPON_DETAILS
   global.get $~lib/memory/__stack_pointer
   global.get $logic/weapon-details/WEAPON_DETAILS
   local.tee $3
   i32.store
   global.get $~lib/memory/__stack_pointer
   call $logic/weapon-details/WeaponDetails#constructor
   local.tee $4
   i32.store offset=8
   local.get $4
   f32.const 0
   f32.store
   local.get $4
   f32.const 600
   f32.store offset=4
   local.get $4
   f32.const 0.15000000596046448
   f32.store offset=8
   local.get $4
   f32.const 0.25
   f32.store offset=12
   local.get $4
   i32.const 200
   i32.store16 offset=16
   local.get $4
   i32.const 50
   i32.store16 offset=18
   local.get $4
   f32.const 10
   f32.store offset=20
   local.get $4
   i32.const 0
   i32.store16 offset=24
   local.get $4
   i32.const 1
   i32.store8 offset=26
   local.get $4
   f32.const 0
   f32.store offset=28
   local.get $4
   f32.const 0.5199999809265137
   f32.store offset=32
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store offset=4
   local.get $3
   i32.const 0
   local.get $4
   call $~lib/map/Map<i32,logic/weapon-details/WeaponDetails>#set
   global.get $~lib/memory/__stack_pointer
   global.get $logic/weapon-details/WEAPON_DETAILS
   local.tee $3
   i32.store
   global.get $~lib/memory/__stack_pointer
   call $logic/weapon-details/WeaponDetails#constructor
   local.tee $4
   i32.store offset=12
   local.get $4
   f32.const 1
   f32.store
   local.get $4
   f32.const 0
   f32.store offset=4
   local.get $4
   f32.const 0
   f32.store offset=8
   local.get $4
   f32.const 0
   f32.store offset=12
   local.get $4
   i32.const 0
   i32.store16 offset=16
   local.get $4
   i32.const 0
   i32.store16 offset=18
   local.get $4
   f32.const 5
   f32.store offset=20
   local.get $4
   i32.const 5
   i32.store16 offset=24
   local.get $4
   i32.const 0
   i32.store8 offset=26
   local.get $4
   f32.const 150
   f32.store offset=28
   local.get $4
   f32.const 0
   f32.store offset=32
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store offset=4
   local.get $3
   i32.const 1
   local.get $4
   call $~lib/map/Map<i32,logic/weapon-details/WeaponDetails>#set
   global.get $~lib/memory/__stack_pointer
   global.get $logic/weapon-details/WEAPON_DETAILS
   local.tee $3
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   local.tee $4
   i64.const 0
   i64.store
   local.get $3
   i32.load offset=8
   local.set $9
   local.get $3
   i32.load offset=16
   local.set $5
   local.get $4
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   local.tee $3
   i64.const 0
   i64.store
   local.get $3
   i32.const 16
   i32.const 12
   call $~lib/rt/itcms/__new
   local.tee $6
   i32.store
   local.get $6
   i32.const 0
   i32.store
   local.get $6
   i32.const 0
   i32.store offset=4
   local.get $6
   i32.const 0
   i32.store offset=8
   local.get $6
   i32.const 0
   i32.store offset=12
   local.get $5
   i32.const 268435455
   i32.gt_u
   if
    i32.const 1056
    i32.const 1632
    i32.const 70
    i32.const 60
    call $~lib/builtins/abort
    unreachable
   end
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.const 8
   local.get $5
   i32.const 8
   i32.gt_u
   select
   i32.const 2
   i32.shl
   local.tee $10
   i32.const 0
   call $~lib/rt/itcms/__new
   local.tee $7
   i32.store offset=4
   local.get $6
   local.get $7
   i32.store
   local.get $7
   if
    local.get $6
    i32.eqz
    if
     i32.const 0
     i32.const 1232
     i32.const 294
     i32.const 14
     call $~lib/builtins/abort
     unreachable
    end
    global.get $~lib/rt/itcms/white
    local.get $7
    i32.const 20
    i32.sub
    local.tee $8
    i32.load offset=4
    i32.const 3
    i32.and
    i32.eq
    if
     local.get $6
     i32.const 20
     i32.sub
     i32.load offset=4
     i32.const 3
     i32.and
     local.tee $3
     global.get $~lib/rt/itcms/white
     i32.eqz
     i32.eq
     if
      local.get $8
      call $~lib/rt/itcms/Object#makeGray
     else
      global.get $~lib/rt/itcms/state
      i32.const 1
      i32.eq
      local.get $3
      i32.const 3
      i32.eq
      i32.and
      if
       local.get $8
       call $~lib/rt/itcms/Object#makeGray
      end
     end
    end
   end
   local.get $6
   local.get $7
   i32.store offset=4
   local.get $6
   local.get $10
   i32.store offset=8
   local.get $6
   local.get $5
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $4
   local.get $6
   i32.store
   loop $for-loop|0
    local.get $1
    local.get $5
    i32.lt_s
    if
     local.get $1
     i32.const 12
     i32.mul
     local.get $9
     i32.add
     local.tee $3
     i32.load offset=8
     i32.const 1
     i32.and
     i32.eqz
     if
      global.get $~lib/memory/__stack_pointer
      local.get $3
      i32.load offset=4
      local.tee $3
      i32.store offset=4
      local.get $6
      local.get $0
      local.get $3
      call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__set
      local.get $0
      i32.const 1
      i32.add
      local.set $0
     end
     local.get $1
     i32.const 1
     i32.add
     local.set $1
     br $for-loop|0
    end
   end
   local.get $6
   local.get $0
   i32.const 0
   call $~lib/array/ensureCapacity
   local.get $6
   local.get $0
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   local.tee $0
   local.get $6
   i32.store
   local.get $0
   i32.const 1680
   i32.store offset=16
   local.get $0
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   i32.const 0
   local.set $0
   local.get $6
   i32.load offset=12
   local.set $1
   loop $for-loop|02
    local.get $1
    local.get $6
    i32.load offset=12
    local.tee $3
    local.get $1
    local.get $3
    i32.lt_s
    select
    local.get $0
    i32.gt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.load offset=4
     local.get $0
     i32.const 2
     i32.shl
     i32.add
     i32.load
     local.tee $3
     i32.store
     local.get $2
     local.get $3
     local.get $0
     local.get $6
     i32.const 1680
     i32.load
     call_indirect $0 (type $f32_i32_i32_i32_=>_f32)
     local.set $2
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     br $for-loop|02
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $2
   global.set $logic/weapon-details/MAX_POSSIBLE_WEAPON_RANGE
   global.get $~lib/memory/__stack_pointer
   i32.const 20
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $~lib/map/Map<i32,logic/ability-details/Ability>#get (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  local.get $0
  i32.load
  local.get $0
  i32.load offset=4
  local.get $1
  local.tee $2
  i32.const -1028477379
  i32.mul
  i32.const 374761397
  i32.add
  i32.const 17
  i32.rotl
  i32.const 668265263
  i32.mul
  local.tee $0
  i32.const 15
  i32.shr_u
  local.get $0
  i32.xor
  i32.const -2048144777
  i32.mul
  local.tee $0
  i32.const 13
  i32.shr_u
  local.get $0
  i32.xor
  i32.const -1028477379
  i32.mul
  local.tee $0
  i32.const 16
  i32.shr_u
  local.get $0
  i32.xor
  i32.and
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  block $__inlined_func$~lib/map/Map<i32,logic/weapon-details/WeaponDetails>#find
   loop $while-continue|0
    local.get $0
    if
     local.get $0
     local.tee $1
     i32.load offset=8
     local.tee $0
     i32.const 1
     i32.and
     if (result i32)
      i32.const 0
     else
      local.get $2
      local.get $1
      i32.load
      i32.eq
     end
     br_if $__inlined_func$~lib/map/Map<i32,logic/weapon-details/WeaponDetails>#find
     local.get $0
     i32.const -2
     i32.and
     local.set $0
     br $while-continue|0
    end
   end
   i32.const 0
   local.set $1
  end
  local.get $1
  i32.eqz
  if
   i32.const 1872
   i32.const 1936
   i32.const 105
   i32.const 17
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.load offset=4
 )
 (func $~lib/array/Array<logic/geom-types/Point>#push (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  local.get $0
  i32.load offset=12
  local.tee $2
  i32.const 1
  i32.add
  local.tee $3
  i32.const 1
  call $~lib/array/ensureCapacity
  local.get $0
  i32.load offset=4
  local.get $2
  i32.const 2
  i32.shl
  i32.add
  local.get $1
  i32.store
  local.get $1
  if
   local.get $0
   local.get $1
   i32.const 1
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  local.get $0
  local.get $3
  i32.store offset=12
 )
 (func $~lib/math/NativeMathf.sin (param $0 f32) (result f32)
  (local $1 i32)
  (local $2 f64)
  (local $3 f64)
  (local $4 f64)
  (local $5 i64)
  (local $6 i32)
  (local $7 i32)
  (local $8 i64)
  (local $9 i64)
  local.get $0
  i32.reinterpret_f32
  local.tee $6
  i32.const 31
  i32.shr_u
  local.set $1
  block $folding-inner0
   local.get $6
   i32.const 2147483647
   i32.and
   local.tee $6
   i32.const 1061752794
   i32.le_u
   if
    local.get $6
    i32.const 964689920
    i32.lt_u
    if
     local.get $0
     return
    end
    local.get $0
    f64.promote_f32
    local.tee $2
    local.get $2
    f64.mul
    local.tee $4
    local.get $2
    f64.mul
    local.set $3
    br $folding-inner0
   end
   local.get $6
   i32.const 1081824209
   i32.le_u
   if
    local.get $6
    i32.const 1075235811
    i32.le_u
    if
     local.get $1
     if (result f32)
      local.get $0
      f64.promote_f32
      f64.const 1.5707963267948966
      f64.add
      local.tee $2
      local.get $2
      f64.mul
      local.tee $2
      local.get $2
      f64.mul
      local.set $3
      local.get $2
      f64.const -0.499999997251031
      f64.mul
      f64.const 1
      f64.add
      local.get $3
      f64.const 0.04166662332373906
      f64.mul
      f64.add
      local.get $3
      local.get $2
      f64.mul
      local.get $2
      f64.const 2.439044879627741e-05
      f64.mul
      f64.const -0.001388676377460993
      f64.add
      f64.mul
      f64.add
      f32.demote_f64
      f32.neg
     else
      local.get $0
      f64.promote_f32
      f64.const 1.5707963267948966
      f64.sub
      local.tee $2
      local.get $2
      f64.mul
      local.tee $2
      local.get $2
      f64.mul
      local.set $3
      local.get $2
      f64.const -0.499999997251031
      f64.mul
      f64.const 1
      f64.add
      local.get $3
      f64.const 0.04166662332373906
      f64.mul
      f64.add
      local.get $3
      local.get $2
      f64.mul
      local.get $2
      f64.const 2.439044879627741e-05
      f64.mul
      f64.const -0.001388676377460993
      f64.add
      f64.mul
      f64.add
      f32.demote_f64
     end
     return
    end
    local.get $0
    f64.promote_f32
    local.tee $2
    f64.const 3.141592653589793
    f64.add
    local.get $2
    f64.const 3.141592653589793
    f64.sub
    local.get $1
    select
    f64.neg
    local.tee $2
    local.get $2
    f64.mul
    local.tee $4
    local.get $2
    f64.mul
    local.set $3
    br $folding-inner0
   end
   local.get $6
   i32.const 1088565717
   i32.le_u
   if
    local.get $6
    i32.const 1085271519
    i32.le_u
    if
     local.get $1
     if (result f32)
      local.get $0
      f64.promote_f32
      f64.const 4.71238898038469
      f64.add
      local.tee $2
      local.get $2
      f64.mul
      local.tee $2
      local.get $2
      f64.mul
      local.set $3
      local.get $2
      f64.const -0.499999997251031
      f64.mul
      f64.const 1
      f64.add
      local.get $3
      f64.const 0.04166662332373906
      f64.mul
      f64.add
      local.get $3
      local.get $2
      f64.mul
      local.get $2
      f64.const 2.439044879627741e-05
      f64.mul
      f64.const -0.001388676377460993
      f64.add
      f64.mul
      f64.add
      f32.demote_f64
     else
      local.get $0
      f64.promote_f32
      f64.const 4.71238898038469
      f64.sub
      local.tee $2
      local.get $2
      f64.mul
      local.tee $2
      local.get $2
      f64.mul
      local.set $3
      local.get $2
      f64.const -0.499999997251031
      f64.mul
      f64.const 1
      f64.add
      local.get $3
      f64.const 0.04166662332373906
      f64.mul
      f64.add
      local.get $3
      local.get $2
      f64.mul
      local.get $2
      f64.const 2.439044879627741e-05
      f64.mul
      f64.const -0.001388676377460993
      f64.add
      f64.mul
      f64.add
      f32.demote_f64
      f32.neg
     end
     return
    end
    local.get $0
    f64.promote_f32
    local.tee $2
    f64.const 6.283185307179586
    f64.add
    local.get $2
    f64.const 6.283185307179586
    f64.sub
    local.get $1
    select
    local.tee $2
    local.get $2
    f64.mul
    local.tee $4
    local.get $2
    f64.mul
    local.set $3
    br $folding-inner0
   end
   local.get $6
   i32.const 2139095040
   i32.ge_u
   if
    local.get $0
    local.get $0
    f32.sub
    return
   end
   block $~lib/math/rempio2f|inlined.0 (result i32)
    local.get $6
    i32.const 1305022427
    i32.lt_u
    if
     local.get $0
     f64.promote_f32
     local.tee $2
     f64.const 0.6366197723675814
     f64.mul
     f64.nearest
     local.set $3
     local.get $2
     local.get $3
     f64.const 1.5707963109016418
     f64.mul
     f64.sub
     local.get $3
     f64.const 1.5893254773528196e-08
     f64.mul
     f64.sub
     global.set $~lib/math/rempio2f_y
     local.get $3
     i32.trunc_f64_s
     br $~lib/math/rempio2f|inlined.0
    end
    local.get $6
    i32.const 23
    i32.shr_s
    i32.const 152
    i32.sub
    local.tee $7
    i32.const 63
    i32.and
    i64.extend_i32_s
    local.set $8
    local.get $7
    i32.const 6
    i32.shr_s
    i32.const 3
    i32.shl
    i32.const 2368
    i32.add
    local.tee $7
    i64.load offset=8
    local.set $9
    f64.const 8.515303950216386e-20
    local.get $0
    f64.promote_f32
    f64.copysign
    local.get $6
    i32.const 8388607
    i32.and
    i32.const 8388608
    i32.or
    i64.extend_i32_s
    local.tee $5
    local.get $7
    i64.load
    local.get $8
    i64.shl
    local.get $9
    i64.const 64
    local.get $8
    i64.sub
    i64.shr_u
    i64.or
    i64.mul
    local.get $8
    i64.const 32
    i64.gt_u
    if (result i64)
     local.get $9
     local.get $8
     i64.const 32
     i64.sub
     i64.shl
     local.get $7
     i64.load offset=16
     i64.const 96
     local.get $8
     i64.sub
     i64.shr_u
     i64.or
    else
     local.get $9
     i64.const 32
     local.get $8
     i64.sub
     i64.shr_u
    end
    local.get $5
    i64.mul
    i64.const 32
    i64.shr_u
    i64.add
    local.tee $5
    i64.const 2
    i64.shl
    local.tee $8
    f64.convert_i64_s
    f64.mul
    global.set $~lib/math/rempio2f_y
    i32.const 0
    local.get $5
    i64.const 62
    i64.shr_u
    local.get $8
    i64.const 63
    i64.shr_u
    i64.add
    i32.wrap_i64
    local.tee $6
    i32.sub
    local.get $6
    local.get $1
    select
   end
   local.set $1
   global.get $~lib/math/rempio2f_y
   local.set $2
   local.get $1
   i32.const 1
   i32.and
   if (result f32)
    local.get $2
    local.get $2
    f64.mul
    local.tee $2
    local.get $2
    f64.mul
    local.set $3
    local.get $2
    f64.const -0.499999997251031
    f64.mul
    f64.const 1
    f64.add
    local.get $3
    f64.const 0.04166662332373906
    f64.mul
    f64.add
    local.get $3
    local.get $2
    f64.mul
    local.get $2
    f64.const 2.439044879627741e-05
    f64.mul
    f64.const -0.001388676377460993
    f64.add
    f64.mul
    f64.add
    f32.demote_f64
   else
    local.get $2
    local.get $2
    local.get $2
    f64.mul
    local.tee $3
    local.get $2
    f64.mul
    local.tee $2
    local.get $3
    f64.const 0.008333329385889463
    f64.mul
    f64.const -0.16666666641626524
    f64.add
    f64.mul
    f64.add
    local.get $2
    local.get $3
    local.get $3
    f64.mul
    f64.mul
    local.get $3
    f64.const 2.718311493989822e-06
    f64.mul
    f64.const -1.9839334836096632e-04
    f64.add
    f64.mul
    f64.add
    f32.demote_f64
   end
   local.tee $0
   f32.neg
   local.get $0
   local.get $1
   i32.const 2
   i32.and
   select
   return
  end
  local.get $2
  local.get $3
  local.get $4
  f64.const 0.008333329385889463
  f64.mul
  f64.const -0.16666666641626524
  f64.add
  f64.mul
  f64.add
  local.get $3
  local.get $4
  local.get $4
  f64.mul
  f64.mul
  local.get $4
  f64.const 2.718311493989822e-06
  f64.mul
  f64.const -1.9839334836096632e-04
  f64.add
  f64.mul
  f64.add
  f32.demote_f64
 )
 (func $~lib/math/NativeMathf.cos (param $0 f32) (result f32)
  (local $1 i32)
  (local $2 f64)
  (local $3 f64)
  (local $4 i64)
  (local $5 i32)
  (local $6 f64)
  (local $7 i32)
  (local $8 i64)
  (local $9 i64)
  local.get $0
  i32.reinterpret_f32
  local.tee $5
  i32.const 31
  i32.shr_u
  local.set $1
  block $folding-inner0
   local.get $5
   i32.const 2147483647
   i32.and
   local.tee $5
   i32.const 1061752794
   i32.le_u
   if
    local.get $5
    i32.const 964689920
    i32.lt_u
    if
     f32.const 1
     return
    end
    local.get $0
    f64.promote_f32
    local.tee $2
    local.get $2
    f64.mul
    local.tee $3
    local.get $3
    f64.mul
    local.set $2
    br $folding-inner0
   end
   local.get $5
   i32.const 1081824209
   i32.le_u
   if
    local.get $5
    i32.const 1075235811
    i32.gt_u
    if
     local.get $0
     f64.promote_f32
     local.tee $2
     f64.const 3.141592653589793
     f64.add
     local.get $2
     f64.const 3.141592653589793
     f64.sub
     local.get $1
     select
     local.tee $2
     local.get $2
     f64.mul
     local.tee $2
     local.get $2
     f64.mul
     local.set $3
     local.get $2
     f64.const -0.499999997251031
     f64.mul
     f64.const 1
     f64.add
     local.get $3
     f64.const 0.04166662332373906
     f64.mul
     f64.add
     local.get $3
     local.get $2
     f64.mul
     local.get $2
     f64.const 2.439044879627741e-05
     f64.mul
     f64.const -0.001388676377460993
     f64.add
     f64.mul
     f64.add
     f32.demote_f64
     f32.neg
     return
    else
     local.get $1
     if (result f64)
      local.get $0
      f64.promote_f32
      f64.const 1.5707963267948966
      f64.add
      local.tee $3
      local.get $3
      f64.mul
      local.tee $2
      local.get $3
      f64.mul
     else
      f64.const 1.5707963267948966
      local.get $0
      f64.promote_f32
      f64.sub
      local.tee $3
      local.get $3
      f64.mul
      local.tee $2
      local.get $3
      f64.mul
     end
     local.set $6
     local.get $3
     local.get $6
     local.get $2
     f64.const 0.008333329385889463
     f64.mul
     f64.const -0.16666666641626524
     f64.add
     f64.mul
     f64.add
     local.get $6
     local.get $2
     local.get $2
     f64.mul
     f64.mul
     local.get $2
     f64.const 2.718311493989822e-06
     f64.mul
     f64.const -1.9839334836096632e-04
     f64.add
     f64.mul
     f64.add
     f32.demote_f64
     return
    end
    unreachable
   end
   local.get $5
   i32.const 1088565717
   i32.le_u
   if
    local.get $5
    i32.const 1085271519
    i32.gt_u
    if
     local.get $0
     f64.promote_f32
     local.tee $2
     f64.const 6.283185307179586
     f64.add
     local.get $2
     f64.const 6.283185307179586
     f64.sub
     local.get $1
     select
     local.tee $2
     local.get $2
     f64.mul
     local.tee $3
     local.get $3
     f64.mul
     local.set $2
     br $folding-inner0
    else
     local.get $1
     if (result f64)
      local.get $0
      f32.neg
      f64.promote_f32
      f64.const 4.71238898038469
      f64.sub
      local.tee $3
      local.get $3
      f64.mul
      local.tee $2
      local.get $3
      f64.mul
     else
      local.get $0
      f64.promote_f32
      f64.const 4.71238898038469
      f64.sub
      local.tee $3
      local.get $3
      f64.mul
      local.tee $2
      local.get $3
      f64.mul
     end
     local.set $6
     local.get $3
     local.get $6
     local.get $2
     f64.const 0.008333329385889463
     f64.mul
     f64.const -0.16666666641626524
     f64.add
     f64.mul
     f64.add
     local.get $6
     local.get $2
     local.get $2
     f64.mul
     f64.mul
     local.get $2
     f64.const 2.718311493989822e-06
     f64.mul
     f64.const -1.9839334836096632e-04
     f64.add
     f64.mul
     f64.add
     f32.demote_f64
     return
    end
    unreachable
   end
   local.get $5
   i32.const 2139095040
   i32.ge_u
   if
    local.get $0
    local.get $0
    f32.sub
    return
   end
   block $~lib/math/rempio2f|inlined.1 (result i32)
    local.get $5
    i32.const 1305022427
    i32.lt_u
    if
     local.get $0
     f64.promote_f32
     local.tee $2
     f64.const 0.6366197723675814
     f64.mul
     f64.nearest
     local.set $3
     local.get $2
     local.get $3
     f64.const 1.5707963109016418
     f64.mul
     f64.sub
     local.get $3
     f64.const 1.5893254773528196e-08
     f64.mul
     f64.sub
     global.set $~lib/math/rempio2f_y
     local.get $3
     i32.trunc_f64_s
     br $~lib/math/rempio2f|inlined.1
    end
    local.get $5
    i32.const 23
    i32.shr_s
    i32.const 152
    i32.sub
    local.tee $7
    i32.const 63
    i32.and
    i64.extend_i32_s
    local.set $8
    local.get $7
    i32.const 6
    i32.shr_s
    i32.const 3
    i32.shl
    i32.const 2368
    i32.add
    local.tee $7
    i64.load offset=8
    local.set $9
    f64.const 8.515303950216386e-20
    local.get $0
    f64.promote_f32
    f64.copysign
    local.get $5
    i32.const 8388607
    i32.and
    i32.const 8388608
    i32.or
    i64.extend_i32_s
    local.tee $4
    local.get $7
    i64.load
    local.get $8
    i64.shl
    local.get $9
    i64.const 64
    local.get $8
    i64.sub
    i64.shr_u
    i64.or
    i64.mul
    local.get $8
    i64.const 32
    i64.gt_u
    if (result i64)
     local.get $9
     local.get $8
     i64.const 32
     i64.sub
     i64.shl
     local.get $7
     i64.load offset=16
     i64.const 96
     local.get $8
     i64.sub
     i64.shr_u
     i64.or
    else
     local.get $9
     i64.const 32
     local.get $8
     i64.sub
     i64.shr_u
    end
    local.get $4
    i64.mul
    i64.const 32
    i64.shr_u
    i64.add
    local.tee $4
    i64.const 2
    i64.shl
    local.tee $8
    f64.convert_i64_s
    f64.mul
    global.set $~lib/math/rempio2f_y
    i32.const 0
    local.get $4
    i64.const 62
    i64.shr_u
    local.get $8
    i64.const 63
    i64.shr_u
    i64.add
    i32.wrap_i64
    local.tee $5
    i32.sub
    local.get $5
    local.get $1
    select
   end
   local.set $1
   global.get $~lib/math/rempio2f_y
   local.set $2
   local.get $1
   i32.const 1
   i32.and
   if (result f32)
    local.get $2
    local.get $2
    local.get $2
    f64.mul
    local.tee $3
    local.get $2
    f64.mul
    local.tee $2
    local.get $3
    f64.const 0.008333329385889463
    f64.mul
    f64.const -0.16666666641626524
    f64.add
    f64.mul
    f64.add
    local.get $2
    local.get $3
    local.get $3
    f64.mul
    f64.mul
    local.get $3
    f64.const 2.718311493989822e-06
    f64.mul
    f64.const -1.9839334836096632e-04
    f64.add
    f64.mul
    f64.add
    f32.demote_f64
   else
    local.get $2
    local.get $2
    f64.mul
    local.tee $2
    local.get $2
    f64.mul
    local.set $3
    local.get $2
    f64.const -0.499999997251031
    f64.mul
    f64.const 1
    f64.add
    local.get $3
    f64.const 0.04166662332373906
    f64.mul
    f64.add
    local.get $3
    local.get $2
    f64.mul
    local.get $2
    f64.const 2.439044879627741e-05
    f64.mul
    f64.const -0.001388676377460993
    f64.add
    f64.mul
    f64.add
    f32.demote_f64
   end
   local.tee $0
   f32.neg
   local.get $0
   local.get $1
   i32.const 1
   i32.add
   i32.const 2
   i32.and
   select
   return
  end
  local.get $3
  f64.const -0.499999997251031
  f64.mul
  f64.const 1
  f64.add
  local.get $2
  f64.const 0.04166662332373906
  f64.mul
  f64.add
  local.get $2
  local.get $3
  f64.mul
  local.get $3
  f64.const 2.439044879627741e-05
  f64.mul
  f64.const -0.001388676377460993
  f64.add
  f64.mul
  f64.add
  f32.demote_f64
 )
 (func $~lib/math/NativeMathf.hypot (param $0 f32) (param $1 f32) (result f32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 f64)
  (local $6 f32)
  local.get $1
  i32.reinterpret_f32
  i32.const 2147483647
  i32.and
  local.tee $3
  local.get $0
  i32.reinterpret_f32
  i32.const 2147483647
  i32.and
  local.tee $2
  i32.gt_u
  if
   local.get $2
   local.get $3
   local.set $2
   local.set $3
  end
  local.get $3
  f32.reinterpret_i32
  local.set $1
  local.get $3
  i32.const 2139095040
  i32.eq
  if
   local.get $1
   return
  end
  local.get $2
  f32.reinterpret_i32
  local.set $6
  local.get $3
  i32.eqz
  local.get $2
  i32.const 2139095040
  i32.ge_u
  i32.or
  local.get $2
  local.get $3
  i32.sub
  i32.const 209715200
  i32.ge_u
  i32.or
  if
   local.get $6
   local.get $1
   f32.add
   return
  end
  f32.const 1
  local.set $0
  local.get $2
  i32.const 1568669696
  i32.ge_u
  if (result f32)
   f32.const 1237940039285380274899124e3
   local.set $0
   local.get $1
   f32.const 8.077935669463161e-28
   f32.mul
   local.set $1
   local.get $6
   f32.const 8.077935669463161e-28
   f32.mul
  else
   local.get $3
   i32.const 562036736
   i32.lt_u
   if (result f32)
    f32.const 8.077935669463161e-28
    local.set $0
    local.get $1
    f32.const 1237940039285380274899124e3
    f32.mul
    local.set $1
    local.get $6
    f32.const 1237940039285380274899124e3
    f32.mul
   else
    local.get $6
   end
  end
  local.set $6
  local.get $0
  local.get $6
  f64.promote_f32
  local.tee $5
  local.get $5
  f64.mul
  local.get $1
  f64.promote_f32
  local.tee $5
  local.get $5
  f64.mul
  f64.add
  f32.demote_f64
  f32.sqrt
  f32.mul
 )
 (func $start:logic/hex-positions
  (local $0 i32)
  (local $1 i32)
  (local $2 f32)
  (local $3 f32)
  (local $4 i32)
  (local $5 f32)
  (local $6 i32)
  (local $7 f32)
  (local $8 f32)
  (local $9 i32)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 1332
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $0
   i64.const 0
   i64.store
   local.get $0
   i64.const 0
   i64.store offset=8
   local.get $0
   i64.const 0
   i64.store offset=16
   local.get $0
   i64.const 0
   i64.store offset=24
   local.get $0
   i64.const 0
   i64.store offset=32
   local.get $0
   i64.const 0
   i64.store offset=40
   local.get $0
   i64.const 0
   i64.store offset=48
   local.get $0
   i64.const 0
   i64.store offset=56
   local.get $0
   i64.const 0
   i64.store offset=64
   local.get $0
   i64.const 0
   i64.store offset=72
   local.get $0
   i64.const 0
   i64.store offset=80
   local.get $0
   i64.const 0
   i64.store offset=88
   local.get $0
   i64.const 0
   i64.store offset=96
   local.get $0
   i64.const 0
   i64.store offset=104
   local.get $0
   i64.const 0
   i64.store offset=112
   local.get $0
   i64.const 0
   i64.store offset=120
   local.get $0
   i64.const 0
   i64.store offset=128
   local.get $0
   i64.const 0
   i64.store offset=136
   local.get $0
   i64.const 0
   i64.store offset=144
   local.get $0
   i64.const 0
   i64.store offset=152
   local.get $0
   i64.const 0
   i64.store offset=160
   local.get $0
   i64.const 0
   i64.store offset=168
   local.get $0
   i64.const 0
   i64.store offset=176
   local.get $0
   i64.const 0
   i64.store offset=184
   local.get $0
   i64.const 0
   i64.store offset=192
   local.get $0
   i64.const 0
   i64.store offset=200
   local.get $0
   i64.const 0
   i64.store offset=208
   local.get $0
   i64.const 0
   i64.store offset=216
   local.get $0
   i64.const 0
   i64.store offset=224
   local.get $0
   i64.const 0
   i64.store offset=232
   local.get $0
   i64.const 0
   i64.store offset=240
   local.get $0
   i64.const 0
   i64.store offset=248
   local.get $0
   i64.const 0
   i64.store offset=256
   local.get $0
   i64.const 0
   i64.store offset=264
   local.get $0
   i64.const 0
   i64.store offset=272
   local.get $0
   i64.const 0
   i64.store offset=280
   local.get $0
   i64.const 0
   i64.store offset=288
   local.get $0
   i64.const 0
   i64.store offset=296
   local.get $0
   i64.const 0
   i64.store offset=304
   local.get $0
   i64.const 0
   i64.store offset=312
   local.get $0
   i64.const 0
   i64.store offset=320
   local.get $0
   i64.const 0
   i64.store offset=328
   local.get $0
   i64.const 0
   i64.store offset=336
   local.get $0
   i64.const 0
   i64.store offset=344
   local.get $0
   i64.const 0
   i64.store offset=352
   local.get $0
   i64.const 0
   i64.store offset=360
   local.get $0
   i64.const 0
   i64.store offset=368
   local.get $0
   i64.const 0
   i64.store offset=376
   local.get $0
   i64.const 0
   i64.store offset=384
   local.get $0
   i64.const 0
   i64.store offset=392
   local.get $0
   i64.const 0
   i64.store offset=400
   local.get $0
   i64.const 0
   i64.store offset=408
   local.get $0
   i64.const 0
   i64.store offset=416
   local.get $0
   i64.const 0
   i64.store offset=424
   local.get $0
   i64.const 0
   i64.store offset=432
   local.get $0
   i64.const 0
   i64.store offset=440
   local.get $0
   i64.const 0
   i64.store offset=448
   local.get $0
   i64.const 0
   i64.store offset=456
   local.get $0
   i64.const 0
   i64.store offset=464
   local.get $0
   i64.const 0
   i64.store offset=472
   local.get $0
   i64.const 0
   i64.store offset=480
   local.get $0
   i64.const 0
   i64.store offset=488
   local.get $0
   i64.const 0
   i64.store offset=496
   local.get $0
   i64.const 0
   i64.store offset=504
   local.get $0
   i64.const 0
   i64.store offset=512
   local.get $0
   i64.const 0
   i64.store offset=520
   local.get $0
   i64.const 0
   i64.store offset=528
   local.get $0
   i64.const 0
   i64.store offset=536
   local.get $0
   i64.const 0
   i64.store offset=544
   local.get $0
   i64.const 0
   i64.store offset=552
   local.get $0
   i64.const 0
   i64.store offset=560
   local.get $0
   i64.const 0
   i64.store offset=568
   local.get $0
   i64.const 0
   i64.store offset=576
   local.get $0
   i64.const 0
   i64.store offset=584
   local.get $0
   i64.const 0
   i64.store offset=592
   local.get $0
   i64.const 0
   i64.store offset=600
   local.get $0
   i64.const 0
   i64.store offset=608
   local.get $0
   i64.const 0
   i64.store offset=616
   local.get $0
   i64.const 0
   i64.store offset=624
   local.get $0
   i64.const 0
   i64.store offset=632
   local.get $0
   i64.const 0
   i64.store offset=640
   local.get $0
   i64.const 0
   i64.store offset=648
   local.get $0
   i64.const 0
   i64.store offset=656
   local.get $0
   i64.const 0
   i64.store offset=664
   local.get $0
   i64.const 0
   i64.store offset=672
   local.get $0
   i64.const 0
   i64.store offset=680
   local.get $0
   i64.const 0
   i64.store offset=688
   local.get $0
   i64.const 0
   i64.store offset=696
   local.get $0
   i64.const 0
   i64.store offset=704
   local.get $0
   i64.const 0
   i64.store offset=712
   local.get $0
   i64.const 0
   i64.store offset=720
   local.get $0
   i64.const 0
   i64.store offset=728
   local.get $0
   i64.const 0
   i64.store offset=736
   local.get $0
   i64.const 0
   i64.store offset=744
   local.get $0
   i64.const 0
   i64.store offset=752
   local.get $0
   i64.const 0
   i64.store offset=760
   local.get $0
   i64.const 0
   i64.store offset=768
   local.get $0
   i64.const 0
   i64.store offset=776
   local.get $0
   i64.const 0
   i64.store offset=784
   local.get $0
   i64.const 0
   i64.store offset=792
   local.get $0
   i64.const 0
   i64.store offset=800
   local.get $0
   i64.const 0
   i64.store offset=808
   local.get $0
   i64.const 0
   i64.store offset=816
   local.get $0
   i64.const 0
   i64.store offset=824
   local.get $0
   i64.const 0
   i64.store offset=832
   local.get $0
   i64.const 0
   i64.store offset=840
   local.get $0
   i64.const 0
   i64.store offset=848
   local.get $0
   i64.const 0
   i64.store offset=856
   local.get $0
   i64.const 0
   i64.store offset=864
   local.get $0
   i64.const 0
   i64.store offset=872
   local.get $0
   i64.const 0
   i64.store offset=880
   local.get $0
   i64.const 0
   i64.store offset=888
   local.get $0
   i64.const 0
   i64.store offset=896
   local.get $0
   i64.const 0
   i64.store offset=904
   local.get $0
   i64.const 0
   i64.store offset=912
   local.get $0
   i64.const 0
   i64.store offset=920
   local.get $0
   i64.const 0
   i64.store offset=928
   local.get $0
   i64.const 0
   i64.store offset=936
   local.get $0
   i64.const 0
   i64.store offset=944
   local.get $0
   i64.const 0
   i64.store offset=952
   local.get $0
   i64.const 0
   i64.store offset=960
   local.get $0
   i64.const 0
   i64.store offset=968
   local.get $0
   i64.const 0
   i64.store offset=976
   local.get $0
   i64.const 0
   i64.store offset=984
   local.get $0
   i64.const 0
   i64.store offset=992
   local.get $0
   i64.const 0
   i64.store offset=1000
   local.get $0
   i64.const 0
   i64.store offset=1008
   local.get $0
   i64.const 0
   i64.store offset=1016
   local.get $0
   i64.const 0
   i64.store offset=1024
   local.get $0
   i64.const 0
   i64.store offset=1032
   local.get $0
   i64.const 0
   i64.store offset=1040
   local.get $0
   i64.const 0
   i64.store offset=1048
   local.get $0
   i64.const 0
   i64.store offset=1056
   local.get $0
   i64.const 0
   i64.store offset=1064
   local.get $0
   i64.const 0
   i64.store offset=1072
   local.get $0
   i64.const 0
   i64.store offset=1080
   local.get $0
   i64.const 0
   i64.store offset=1088
   local.get $0
   i64.const 0
   i64.store offset=1096
   local.get $0
   i64.const 0
   i64.store offset=1104
   local.get $0
   i64.const 0
   i64.store offset=1112
   local.get $0
   i64.const 0
   i64.store offset=1120
   local.get $0
   i64.const 0
   i64.store offset=1128
   local.get $0
   i64.const 0
   i64.store offset=1136
   local.get $0
   i64.const 0
   i64.store offset=1144
   local.get $0
   i64.const 0
   i64.store offset=1152
   local.get $0
   i64.const 0
   i64.store offset=1160
   local.get $0
   i64.const 0
   i64.store offset=1168
   local.get $0
   i64.const 0
   i64.store offset=1176
   local.get $0
   i64.const 0
   i64.store offset=1184
   local.get $0
   i64.const 0
   i64.store offset=1192
   local.get $0
   i64.const 0
   i64.store offset=1200
   local.get $0
   i64.const 0
   i64.store offset=1208
   local.get $0
   i64.const 0
   i64.store offset=1216
   local.get $0
   i64.const 0
   i64.store offset=1224
   local.get $0
   i64.const 0
   i64.store offset=1232
   local.get $0
   i64.const 0
   i64.store offset=1240
   local.get $0
   i64.const 0
   i64.store offset=1248
   local.get $0
   i64.const 0
   i64.store offset=1256
   local.get $0
   i64.const 0
   i64.store offset=1264
   local.get $0
   i64.const 0
   i64.store offset=1272
   local.get $0
   i64.const 0
   i64.store offset=1280
   local.get $0
   i64.const 0
   i64.store offset=1288
   local.get $0
   i64.const 0
   i64.store offset=1296
   local.get $0
   i64.const 0
   i64.store offset=1304
   local.get $0
   i64.const 0
   i64.store offset=1312
   local.get $0
   i64.const 0
   i64.store offset=1320
   local.get $0
   i32.const 0
   i32.store offset=1328
   local.get $0
   i32.const 16
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $0
   i64.const 0
   i64.store
   local.get $0
   i64.const 0
   i64.store offset=8
   local.get $0
   global.get $logic/squad-details/SQUAD_DETAILS
   local.tee $0
   i32.store
   local.get $0
   i32.const 2
   call $~lib/map/Map<i32,logic/ability-details/Ability>#get
   f32.load offset=16
   f32.const 60
   f32.add
   f32.const 2
   f32.mul
   global.set $logic/attacker-positions/DISTANCE_BETWEEN_ATTACKERS
   global.get $logic/weapon-details/MAX_POSSIBLE_WEAPON_RANGE
   global.get $logic/attacker-positions/DISTANCE_BETWEEN_ATTACKERS
   f32.div
   f32.ceil
   i32.trunc_f32_s
   global.set $logic/attacker-positions/NUMBER_OF_RANGE_BREAKPOINTS
   i32.const 1
   local.set $4
   loop $for-loop|0
    global.get $logic/attacker-positions/NUMBER_OF_RANGE_BREAKPOINTS
    local.get $4
    i32.ge_s
    if
     local.get $4
     f32.convert_i32_s
     global.get $logic/attacker-positions/DISTANCE_BETWEEN_ATTACKERS
     f32.mul
     local.tee $5
     local.set $3
     global.get $~lib/memory/__stack_pointer
     i32.const 0
     i32.const 32
     i32.const 2224
     call $~lib/rt/__newArray
     local.tee $6
     i32.store offset=4
     loop $while-continue|1
      global.get $logic/attacker-positions/DISTANCE_BETWEEN_ATTACKERS
      f32.const 0.5
      f32.mul
      local.get $3
      f32.lt
      if
       block $__inlined_func$~lib/math/NativeMathf.acos (result f32)
        f32.const 1
        global.get $logic/attacker-positions/DISTANCE_BETWEEN_ATTACKERS
        local.tee $2
        local.get $2
        f32.mul
        local.get $3
        local.get $3
        f32.mul
        f32.const 2
        f32.mul
        f32.div
        f32.sub
        local.tee $2
        i32.reinterpret_f32
        local.tee $0
        i32.const 2147483647
        i32.and
        local.tee $1
        i32.const 1065353216
        i32.ge_u
        if
         local.get $1
         i32.const 1065353216
         i32.eq
         if
          f32.const 3.141592502593994
          local.get $0
          i32.const 31
          i32.shr_u
          br_if $__inlined_func$~lib/math/NativeMathf.acos
          drop
          f32.const 0
          br $__inlined_func$~lib/math/NativeMathf.acos
         end
         f32.const 0
         local.get $2
         local.get $2
         f32.sub
         f32.div
         br $__inlined_func$~lib/math/NativeMathf.acos
        end
        local.get $1
        i32.const 1056964608
        i32.lt_u
        if
         f32.const 1.570796251296997
         local.get $1
         i32.const 847249408
         i32.le_u
         br_if $__inlined_func$~lib/math/NativeMathf.acos
         drop
         f32.const 1.570796251296997
         local.get $2
         f32.const 7.549789415861596e-08
         local.get $2
         local.get $2
         local.get $2
         f32.mul
         local.tee $2
         local.get $2
         local.get $2
         f32.const -0.008656363002955914
         f32.mul
         f32.const -0.04274342209100723
         f32.add
         f32.mul
         f32.const 0.16666586697101593
         f32.add
         f32.mul
         local.get $2
         f32.const -0.7066296339035034
         f32.mul
         f32.const 1
         f32.add
         f32.div
         f32.mul
         f32.sub
         f32.sub
         f32.sub
         br $__inlined_func$~lib/math/NativeMathf.acos
        end
        local.get $0
        i32.const 31
        i32.shr_u
        if
         f32.const 1.570796251296997
         local.get $2
         f32.const 0.5
         f32.mul
         f32.const 0.5
         f32.add
         local.tee $2
         f32.sqrt
         local.tee $7
         local.get $2
         local.get $2
         local.get $2
         f32.const -0.008656363002955914
         f32.mul
         f32.const -0.04274342209100723
         f32.add
         f32.mul
         f32.const 0.16666586697101593
         f32.add
         f32.mul
         local.get $2
         f32.const -0.7066296339035034
         f32.mul
         f32.const 1
         f32.add
         f32.div
         local.get $7
         f32.mul
         f32.const 7.549789415861596e-08
         f32.sub
         f32.add
         f32.sub
         f32.const 2
         f32.mul
         br $__inlined_func$~lib/math/NativeMathf.acos
        end
        f32.const 0.5
        local.get $2
        f32.const 0.5
        f32.mul
        f32.sub
        local.tee $2
        f32.sqrt
        local.tee $7
        i32.reinterpret_f32
        i32.const -4096
        i32.and
        f32.reinterpret_i32
        local.tee $8
        local.get $2
        local.get $2
        local.get $2
        f32.const -0.008656363002955914
        f32.mul
        f32.const -0.04274342209100723
        f32.add
        f32.mul
        f32.const 0.16666586697101593
        f32.add
        f32.mul
        local.get $2
        f32.const -0.7066296339035034
        f32.mul
        f32.const 1
        f32.add
        f32.div
        local.get $7
        f32.mul
        local.get $2
        local.get $8
        local.get $8
        f32.mul
        f32.sub
        local.get $7
        local.get $8
        f32.add
        f32.div
        f32.add
        f32.add
        f32.const 2
        f32.mul
       end
       local.set $7
       f32.const 0
       local.set $2
       loop $while-continue|2
        local.get $2
        local.get $7
        f32.mul
        f32.abs
        f32.const 3.1415927410125732
        local.get $7
        f32.const 0.5
        f32.mul
        f32.sub
        f32.lt
        if
         global.get $~lib/memory/__stack_pointer
         i32.const 0
         call $logic/geom-types/Point#constructor
         local.tee $0
         i32.store offset=12
         local.get $0
         local.get $2
         local.get $7
         f32.mul
         f32.store
         local.get $0
         local.get $3
         f32.store offset=4
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store offset=8
         local.get $6
         local.get $0
         call $~lib/array/Array<logic/geom-types/Point>#push
         local.get $2
         f32.neg
         f32.const 1
         local.get $2
         f32.sub
         local.get $2
         f32.const 0
         f32.gt
         select
         local.set $2
         br $while-continue|2
        end
       end
       local.get $3
       global.get $logic/attacker-positions/DISTANCE_BETWEEN_ATTACKERS
       f32.sub
       local.set $3
       br $while-continue|1
      end
     end
     global.get $~lib/memory/__stack_pointer
     i32.const 16
     i32.sub
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 6788
     i32.lt_s
     br_if $folding-inner0
     global.get $~lib/memory/__stack_pointer
     local.tee $0
     i64.const 0
     i64.store
     local.get $0
     i64.const 0
     i64.store offset=8
     i32.const 0
     local.set $0
     loop $while-continue|0
      local.get $0
      i32.eqz
      if
       i32.const 1
       local.set $0
       i32.const 1
       local.set $1
       loop $for-loop|1
        local.get $6
        i32.load offset=12
        local.get $1
        i32.gt_s
        if
         global.get $~lib/memory/__stack_pointer
         local.get $6
         local.get $1
         i32.const 1
         i32.sub
         call $~lib/array/Array<logic/geom-types/Point>#__get
         local.tee $9
         i32.store
         global.get $~lib/memory/__stack_pointer
         local.get $6
         local.get $1
         call $~lib/array/Array<logic/geom-types/Point>#__get
         local.tee $10
         i32.store offset=4
         local.get $9
         f32.load
         call $~lib/math/NativeMathf.sin
         local.get $9
         f32.load offset=4
         f32.mul
         local.get $9
         f32.load
         f32.neg
         call $~lib/math/NativeMathf.cos
         local.get $9
         f32.load offset=4
         f32.mul
         local.get $10
         f32.load
         call $~lib/math/NativeMathf.sin
         local.get $10
         f32.load offset=4
         f32.mul
         local.set $7
         local.get $10
         f32.load
         f32.neg
         call $~lib/math/NativeMathf.cos
         local.get $10
         f32.load offset=4
         f32.mul
         local.set $8
         local.get $5
         f32.add
         call $~lib/math/NativeMathf.hypot
         local.get $7
         local.get $8
         local.get $5
         f32.add
         call $~lib/math/NativeMathf.hypot
         f32.lt
         if
          global.get $~lib/memory/__stack_pointer
          local.get $6
          local.get $1
          i32.const 1
          i32.sub
          local.tee $0
          call $~lib/array/Array<logic/geom-types/Point>#__get
          local.tee $9
          i32.store offset=8
          local.get $6
          local.get $1
          call $~lib/array/Array<logic/geom-types/Point>#__get
          local.set $10
          global.get $~lib/memory/__stack_pointer
          local.get $10
          i32.store offset=12
          local.get $6
          local.get $0
          local.get $10
          call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__set
          local.get $6
          local.get $1
          local.get $9
          call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__set
          i32.const 0
          local.set $0
         end
         local.get $1
         i32.const 1
         i32.add
         local.set $1
         br $for-loop|1
        end
       end
       br $while-continue|0
      end
     end
     global.get $~lib/memory/__stack_pointer
     i32.const 16
     i32.add
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 2176
     i32.store
     i32.const 2176
     local.get $6
     call $~lib/array/Array<logic/geom-types/Point>#push
     local.get $4
     i32.const 1
     i32.add
     local.set $4
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 44
   i32.const 6
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.const 5
   call $~lib/rt/itcms/__new
   local.tee $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=8
   local.get $4
   f32.const 0
   f32.store
   local.get $4
   f32.const 0
   f32.store offset=4
   local.get $1
   i32.const 0
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   local.get $0
   i32.const 0
   local.get $1
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 24
   i32.const 5
   call $~lib/rt/itcms/__new
   local.tee $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=12
   local.get $4
   f32.const 90
   f32.store
   local.get $4
   f32.const -156
   f32.store offset=4
   local.get $1
   i32.const 0
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=16
   local.get $4
   f32.const 180
   f32.store
   local.get $4
   f32.const 0
   f32.store offset=4
   local.get $1
   i32.const 1
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=20
   local.get $4
   f32.const 90
   f32.store
   local.get $4
   f32.const 156
   f32.store offset=4
   local.get $1
   i32.const 2
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=24
   local.get $4
   f32.const -90
   f32.store
   local.get $4
   f32.const 156
   f32.store offset=4
   local.get $1
   i32.const 3
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=28
   local.get $4
   f32.const -180
   f32.store
   local.get $4
   f32.const 0
   f32.store offset=4
   local.get $1
   i32.const 4
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=32
   local.get $4
   f32.const -90
   f32.store
   local.get $4
   f32.const -156
   f32.store offset=4
   local.get $1
   i32.const 5
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   local.get $0
   i32.const 1
   local.get $1
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 48
   i32.const 5
   call $~lib/rt/itcms/__new
   local.tee $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=36
   local.get $4
   f32.const 0
   f32.store
   local.get $4
   f32.const -312
   f32.store offset=4
   local.get $1
   i32.const 0
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=40
   local.get $4
   f32.const 180
   f32.store
   local.get $4
   f32.const -312
   f32.store offset=4
   local.get $1
   i32.const 1
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=44
   local.get $4
   f32.const 270
   f32.store
   local.get $4
   f32.const -156
   f32.store offset=4
   local.get $1
   i32.const 2
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=48
   local.get $4
   f32.const 360
   f32.store
   local.get $4
   f32.const 0
   f32.store offset=4
   local.get $1
   i32.const 3
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=52
   local.get $4
   f32.const 270
   f32.store
   local.get $4
   f32.const 156
   f32.store offset=4
   local.get $1
   i32.const 4
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=56
   local.get $4
   f32.const 180
   f32.store
   local.get $4
   f32.const 312
   f32.store offset=4
   local.get $1
   i32.const 5
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=60
   local.get $4
   f32.const 0
   f32.store
   local.get $4
   f32.const 312
   f32.store offset=4
   local.get $1
   i32.const 6
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=64
   local.get $4
   f32.const -180
   f32.store
   local.get $4
   f32.const 312
   f32.store offset=4
   local.get $1
   i32.const 7
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=68
   local.get $4
   f32.const -270
   f32.store
   local.get $4
   f32.const 156
   f32.store offset=4
   local.get $1
   i32.const 8
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=72
   local.get $4
   f32.const -360
   f32.store
   local.get $4
   f32.const 0
   f32.store offset=4
   local.get $1
   i32.const 9
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=76
   local.get $4
   f32.const -270
   f32.store
   local.get $4
   f32.const -156
   f32.store offset=4
   local.get $1
   i32.const 10
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=80
   local.get $4
   f32.const -180
   f32.store
   local.get $4
   f32.const -312
   f32.store offset=4
   local.get $1
   i32.const 11
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   local.get $0
   i32.const 2
   local.get $1
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 72
   i32.const 5
   call $~lib/rt/itcms/__new
   local.tee $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=84
   local.get $4
   f32.const 90
   f32.store
   local.get $4
   f32.const -468
   f32.store offset=4
   local.get $1
   i32.const 0
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=88
   local.get $4
   f32.const 270
   f32.store
   local.get $4
   f32.const -468
   f32.store offset=4
   local.get $1
   i32.const 1
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=92
   local.get $4
   f32.const 360
   f32.store
   local.get $4
   f32.const -312
   f32.store offset=4
   local.get $1
   i32.const 2
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=96
   local.get $4
   f32.const 450
   f32.store
   local.get $4
   f32.const -156
   f32.store offset=4
   local.get $1
   i32.const 3
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=100
   local.get $4
   f32.const 540
   f32.store
   local.get $4
   f32.const 0
   f32.store offset=4
   local.get $1
   i32.const 4
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=104
   local.get $4
   f32.const 450
   f32.store
   local.get $4
   f32.const 156
   f32.store offset=4
   local.get $1
   i32.const 5
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=108
   local.get $4
   f32.const 360
   f32.store
   local.get $4
   f32.const 312
   f32.store offset=4
   local.get $1
   i32.const 6
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=112
   local.get $4
   f32.const 270
   f32.store
   local.get $4
   f32.const 468
   f32.store offset=4
   local.get $1
   i32.const 7
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=116
   local.get $4
   f32.const 90
   f32.store
   local.get $4
   f32.const 468
   f32.store offset=4
   local.get $1
   i32.const 8
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=120
   local.get $4
   f32.const -90
   f32.store
   local.get $4
   f32.const 468
   f32.store offset=4
   local.get $1
   i32.const 9
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=124
   local.get $4
   f32.const -270
   f32.store
   local.get $4
   f32.const 468
   f32.store offset=4
   local.get $1
   i32.const 10
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=128
   local.get $4
   f32.const -360
   f32.store
   local.get $4
   f32.const 312
   f32.store offset=4
   local.get $1
   i32.const 11
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=132
   local.get $4
   f32.const -450
   f32.store
   local.get $4
   f32.const 156
   f32.store offset=4
   local.get $1
   i32.const 12
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=136
   local.get $4
   f32.const -540
   f32.store
   local.get $4
   f32.const 0
   f32.store offset=4
   local.get $1
   i32.const 13
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=140
   local.get $4
   f32.const -450
   f32.store
   local.get $4
   f32.const -156
   f32.store offset=4
   local.get $1
   i32.const 14
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=144
   local.get $4
   f32.const -360
   f32.store
   local.get $4
   f32.const -312
   f32.store offset=4
   local.get $1
   i32.const 15
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=148
   local.get $4
   f32.const -270
   f32.store
   local.get $4
   f32.const -468
   f32.store offset=4
   local.get $1
   i32.const 16
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=152
   local.get $4
   f32.const -90
   f32.store
   local.get $4
   f32.const -468
   f32.store offset=4
   local.get $1
   i32.const 17
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   local.get $0
   i32.const 3
   local.get $1
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 96
   i32.const 5
   call $~lib/rt/itcms/__new
   local.tee $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=156
   local.get $4
   f32.const 0
   f32.store
   local.get $4
   f32.const -624
   f32.store offset=4
   local.get $1
   i32.const 0
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=160
   local.get $4
   f32.const 180
   f32.store
   local.get $4
   f32.const -624
   f32.store offset=4
   local.get $1
   i32.const 1
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=164
   local.get $4
   f32.const 360
   f32.store
   local.get $4
   f32.const -624
   f32.store offset=4
   local.get $1
   i32.const 2
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=168
   local.get $4
   f32.const 450
   f32.store
   local.get $4
   f32.const -468
   f32.store offset=4
   local.get $1
   i32.const 3
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=172
   local.get $4
   f32.const 540
   f32.store
   local.get $4
   f32.const -312
   f32.store offset=4
   local.get $1
   i32.const 4
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=176
   local.get $4
   f32.const 630
   f32.store
   local.get $4
   f32.const -156
   f32.store offset=4
   local.get $1
   i32.const 5
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=180
   local.get $4
   f32.const 720
   f32.store
   local.get $4
   f32.const 0
   f32.store offset=4
   local.get $1
   i32.const 6
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=184
   local.get $4
   f32.const 630
   f32.store
   local.get $4
   f32.const 156
   f32.store offset=4
   local.get $1
   i32.const 7
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=188
   local.get $4
   f32.const 540
   f32.store
   local.get $4
   f32.const 312
   f32.store offset=4
   local.get $1
   i32.const 8
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=192
   local.get $4
   f32.const 450
   f32.store
   local.get $4
   f32.const 468
   f32.store offset=4
   local.get $1
   i32.const 9
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=196
   local.get $4
   f32.const 360
   f32.store
   local.get $4
   f32.const 624
   f32.store offset=4
   local.get $1
   i32.const 10
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=200
   local.get $4
   f32.const 180
   f32.store
   local.get $4
   f32.const 624
   f32.store offset=4
   local.get $1
   i32.const 11
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=204
   local.get $4
   f32.const 0
   f32.store
   local.get $4
   f32.const 624
   f32.store offset=4
   local.get $1
   i32.const 12
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=208
   local.get $4
   f32.const -180
   f32.store
   local.get $4
   f32.const 624
   f32.store offset=4
   local.get $1
   i32.const 13
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=212
   local.get $4
   f32.const -360
   f32.store
   local.get $4
   f32.const 624
   f32.store offset=4
   local.get $1
   i32.const 14
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=216
   local.get $4
   f32.const -450
   f32.store
   local.get $4
   f32.const 468
   f32.store offset=4
   local.get $1
   i32.const 15
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=220
   local.get $4
   f32.const -540
   f32.store
   local.get $4
   f32.const 312
   f32.store offset=4
   local.get $1
   i32.const 16
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=224
   local.get $4
   f32.const -630
   f32.store
   local.get $4
   f32.const 156
   f32.store offset=4
   local.get $1
   i32.const 17
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=228
   local.get $4
   f32.const -720
   f32.store
   local.get $4
   f32.const 0
   f32.store offset=4
   local.get $1
   i32.const 18
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=232
   local.get $4
   f32.const -630
   f32.store
   local.get $4
   f32.const -156
   f32.store offset=4
   local.get $1
   i32.const 19
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=236
   local.get $4
   f32.const -540
   f32.store
   local.get $4
   f32.const -312
   f32.store offset=4
   local.get $1
   i32.const 20
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=240
   local.get $4
   f32.const -450
   f32.store
   local.get $4
   f32.const -468
   f32.store offset=4
   local.get $1
   i32.const 21
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=244
   local.get $4
   f32.const -360
   f32.store
   local.get $4
   f32.const -624
   f32.store offset=4
   local.get $1
   i32.const 22
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=248
   local.get $4
   f32.const -180
   f32.store
   local.get $4
   f32.const -624
   f32.store offset=4
   local.get $1
   i32.const 23
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   local.get $0
   i32.const 4
   local.get $1
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 120
   i32.const 5
   call $~lib/rt/itcms/__new
   local.tee $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=252
   local.get $4
   f32.const 90
   f32.store
   local.get $4
   f32.const -780
   f32.store offset=4
   local.get $1
   i32.const 0
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=256
   local.get $4
   f32.const 270
   f32.store
   local.get $4
   f32.const -780
   f32.store offset=4
   local.get $1
   i32.const 1
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=260
   local.get $4
   f32.const 450
   f32.store
   local.get $4
   f32.const -780
   f32.store offset=4
   local.get $1
   i32.const 2
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=264
   local.get $4
   f32.const 540
   f32.store
   local.get $4
   f32.const -624
   f32.store offset=4
   local.get $1
   i32.const 3
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=268
   local.get $4
   f32.const 630
   f32.store
   local.get $4
   f32.const -468
   f32.store offset=4
   local.get $1
   i32.const 4
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=272
   local.get $4
   f32.const 720
   f32.store
   local.get $4
   f32.const -312
   f32.store offset=4
   local.get $1
   i32.const 5
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=276
   local.get $4
   f32.const 810
   f32.store
   local.get $4
   f32.const -156
   f32.store offset=4
   local.get $1
   i32.const 6
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=280
   local.get $4
   f32.const 900
   f32.store
   local.get $4
   f32.const 0
   f32.store offset=4
   local.get $1
   i32.const 7
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=284
   local.get $4
   f32.const 810
   f32.store
   local.get $4
   f32.const 156
   f32.store offset=4
   local.get $1
   i32.const 8
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=288
   local.get $4
   f32.const 720
   f32.store
   local.get $4
   f32.const 312
   f32.store offset=4
   local.get $1
   i32.const 9
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=292
   local.get $4
   f32.const 630
   f32.store
   local.get $4
   f32.const 468
   f32.store offset=4
   local.get $1
   i32.const 10
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=296
   local.get $4
   f32.const 540
   f32.store
   local.get $4
   f32.const 624
   f32.store offset=4
   local.get $1
   i32.const 11
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=300
   local.get $4
   f32.const 450
   f32.store
   local.get $4
   f32.const 780
   f32.store offset=4
   local.get $1
   i32.const 12
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=304
   local.get $4
   f32.const 270
   f32.store
   local.get $4
   f32.const 780
   f32.store offset=4
   local.get $1
   i32.const 13
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=308
   local.get $4
   f32.const 90
   f32.store
   local.get $4
   f32.const 780
   f32.store offset=4
   local.get $1
   i32.const 14
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=312
   local.get $4
   f32.const -90
   f32.store
   local.get $4
   f32.const 780
   f32.store offset=4
   local.get $1
   i32.const 15
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=316
   local.get $4
   f32.const -270
   f32.store
   local.get $4
   f32.const 780
   f32.store offset=4
   local.get $1
   i32.const 16
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=320
   local.get $4
   f32.const -450
   f32.store
   local.get $4
   f32.const 780
   f32.store offset=4
   local.get $1
   i32.const 17
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=324
   local.get $4
   f32.const -540
   f32.store
   local.get $4
   f32.const 624
   f32.store offset=4
   local.get $1
   i32.const 18
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=328
   local.get $4
   f32.const -630
   f32.store
   local.get $4
   f32.const 468
   f32.store offset=4
   local.get $1
   i32.const 19
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=332
   local.get $4
   f32.const -720
   f32.store
   local.get $4
   f32.const 312
   f32.store offset=4
   local.get $1
   i32.const 20
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=336
   local.get $4
   f32.const -810
   f32.store
   local.get $4
   f32.const 156
   f32.store offset=4
   local.get $1
   i32.const 21
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=340
   local.get $4
   f32.const -900
   f32.store
   local.get $4
   f32.const 0
   f32.store offset=4
   local.get $1
   i32.const 22
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=344
   local.get $4
   f32.const -810
   f32.store
   local.get $4
   f32.const -156
   f32.store offset=4
   local.get $1
   i32.const 23
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=348
   local.get $4
   f32.const -720
   f32.store
   local.get $4
   f32.const -312
   f32.store offset=4
   local.get $1
   i32.const 24
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=352
   local.get $4
   f32.const -630
   f32.store
   local.get $4
   f32.const -468
   f32.store offset=4
   local.get $1
   i32.const 25
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=356
   local.get $4
   f32.const -540
   f32.store
   local.get $4
   f32.const -624
   f32.store offset=4
   local.get $1
   i32.const 26
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=360
   local.get $4
   f32.const -450
   f32.store
   local.get $4
   f32.const -780
   f32.store offset=4
   local.get $1
   i32.const 27
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=364
   local.get $4
   f32.const -270
   f32.store
   local.get $4
   f32.const -780
   f32.store offset=4
   local.get $1
   i32.const 28
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=368
   local.get $4
   f32.const -90
   f32.store
   local.get $4
   f32.const -780
   f32.store offset=4
   local.get $1
   i32.const 29
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   local.get $0
   i32.const 5
   local.get $1
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 144
   i32.const 5
   call $~lib/rt/itcms/__new
   local.tee $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=372
   local.get $4
   f32.const 0
   f32.store
   local.get $4
   f32.const -936
   f32.store offset=4
   local.get $1
   i32.const 0
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=376
   local.get $4
   f32.const 180
   f32.store
   local.get $4
   f32.const -936
   f32.store offset=4
   local.get $1
   i32.const 1
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=380
   local.get $4
   f32.const 360
   f32.store
   local.get $4
   f32.const -936
   f32.store offset=4
   local.get $1
   i32.const 2
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=384
   local.get $4
   f32.const 540
   f32.store
   local.get $4
   f32.const -936
   f32.store offset=4
   local.get $1
   i32.const 3
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=388
   local.get $4
   f32.const 630
   f32.store
   local.get $4
   f32.const -780
   f32.store offset=4
   local.get $1
   i32.const 4
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=392
   local.get $4
   f32.const 720
   f32.store
   local.get $4
   f32.const -624
   f32.store offset=4
   local.get $1
   i32.const 5
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=396
   local.get $4
   f32.const 810
   f32.store
   local.get $4
   f32.const -468
   f32.store offset=4
   local.get $1
   i32.const 6
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=400
   local.get $4
   f32.const 900
   f32.store
   local.get $4
   f32.const -312
   f32.store offset=4
   local.get $1
   i32.const 7
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=404
   local.get $4
   f32.const 990
   f32.store
   local.get $4
   f32.const -156
   f32.store offset=4
   local.get $1
   i32.const 8
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=408
   local.get $4
   f32.const 1080
   f32.store
   local.get $4
   f32.const 0
   f32.store offset=4
   local.get $1
   i32.const 9
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=412
   local.get $4
   f32.const 990
   f32.store
   local.get $4
   f32.const 156
   f32.store offset=4
   local.get $1
   i32.const 10
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=416
   local.get $4
   f32.const 900
   f32.store
   local.get $4
   f32.const 312
   f32.store offset=4
   local.get $1
   i32.const 11
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=420
   local.get $4
   f32.const 810
   f32.store
   local.get $4
   f32.const 468
   f32.store offset=4
   local.get $1
   i32.const 12
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=424
   local.get $4
   f32.const 720
   f32.store
   local.get $4
   f32.const 624
   f32.store offset=4
   local.get $1
   i32.const 13
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=428
   local.get $4
   f32.const 630
   f32.store
   local.get $4
   f32.const 780
   f32.store offset=4
   local.get $1
   i32.const 14
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=432
   local.get $4
   f32.const 540
   f32.store
   local.get $4
   f32.const 936
   f32.store offset=4
   local.get $1
   i32.const 15
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=436
   local.get $4
   f32.const 360
   f32.store
   local.get $4
   f32.const 936
   f32.store offset=4
   local.get $1
   i32.const 16
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=440
   local.get $4
   f32.const 180
   f32.store
   local.get $4
   f32.const 936
   f32.store offset=4
   local.get $1
   i32.const 17
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=444
   local.get $4
   f32.const 0
   f32.store
   local.get $4
   f32.const 936
   f32.store offset=4
   local.get $1
   i32.const 18
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=448
   local.get $4
   f32.const -180
   f32.store
   local.get $4
   f32.const 936
   f32.store offset=4
   local.get $1
   i32.const 19
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=452
   local.get $4
   f32.const -360
   f32.store
   local.get $4
   f32.const 936
   f32.store offset=4
   local.get $1
   i32.const 20
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=456
   local.get $4
   f32.const -540
   f32.store
   local.get $4
   f32.const 936
   f32.store offset=4
   local.get $1
   i32.const 21
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=460
   local.get $4
   f32.const -630
   f32.store
   local.get $4
   f32.const 780
   f32.store offset=4
   local.get $1
   i32.const 22
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=464
   local.get $4
   f32.const -720
   f32.store
   local.get $4
   f32.const 624
   f32.store offset=4
   local.get $1
   i32.const 23
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=468
   local.get $4
   f32.const -810
   f32.store
   local.get $4
   f32.const 468
   f32.store offset=4
   local.get $1
   i32.const 24
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=472
   local.get $4
   f32.const -900
   f32.store
   local.get $4
   f32.const 312
   f32.store offset=4
   local.get $1
   i32.const 25
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=476
   local.get $4
   f32.const -990
   f32.store
   local.get $4
   f32.const 156
   f32.store offset=4
   local.get $1
   i32.const 26
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=480
   local.get $4
   f32.const -1080
   f32.store
   local.get $4
   f32.const 0
   f32.store offset=4
   local.get $1
   i32.const 27
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=484
   local.get $4
   f32.const -990
   f32.store
   local.get $4
   f32.const -156
   f32.store offset=4
   local.get $1
   i32.const 28
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=488
   local.get $4
   f32.const -900
   f32.store
   local.get $4
   f32.const -312
   f32.store offset=4
   local.get $1
   i32.const 29
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=492
   local.get $4
   f32.const -810
   f32.store
   local.get $4
   f32.const -468
   f32.store offset=4
   local.get $1
   i32.const 30
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=496
   local.get $4
   f32.const -720
   f32.store
   local.get $4
   f32.const -624
   f32.store offset=4
   local.get $1
   i32.const 31
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=500
   local.get $4
   f32.const -630
   f32.store
   local.get $4
   f32.const -780
   f32.store offset=4
   local.get $1
   i32.const 32
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=504
   local.get $4
   f32.const -540
   f32.store
   local.get $4
   f32.const -936
   f32.store offset=4
   local.get $1
   i32.const 33
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=508
   local.get $4
   f32.const -360
   f32.store
   local.get $4
   f32.const -936
   f32.store offset=4
   local.get $1
   i32.const 34
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=512
   local.get $4
   f32.const -180
   f32.store
   local.get $4
   f32.const -936
   f32.store offset=4
   local.get $1
   i32.const 35
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   local.get $0
   i32.const 6
   local.get $1
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 168
   i32.const 5
   call $~lib/rt/itcms/__new
   local.tee $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=516
   local.get $4
   f32.const 90
   f32.store
   local.get $4
   f32.const -1092
   f32.store offset=4
   local.get $1
   i32.const 0
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=520
   local.get $4
   f32.const 270
   f32.store
   local.get $4
   f32.const -1092
   f32.store offset=4
   local.get $1
   i32.const 1
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=524
   local.get $4
   f32.const 450
   f32.store
   local.get $4
   f32.const -1092
   f32.store offset=4
   local.get $1
   i32.const 2
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=528
   local.get $4
   f32.const 630
   f32.store
   local.get $4
   f32.const -1092
   f32.store offset=4
   local.get $1
   i32.const 3
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=532
   local.get $4
   f32.const 720
   f32.store
   local.get $4
   f32.const -936
   f32.store offset=4
   local.get $1
   i32.const 4
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=536
   local.get $4
   f32.const 810
   f32.store
   local.get $4
   f32.const -780
   f32.store offset=4
   local.get $1
   i32.const 5
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=540
   local.get $4
   f32.const 900
   f32.store
   local.get $4
   f32.const -624
   f32.store offset=4
   local.get $1
   i32.const 6
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=544
   local.get $4
   f32.const 990
   f32.store
   local.get $4
   f32.const -468
   f32.store offset=4
   local.get $1
   i32.const 7
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=548
   local.get $4
   f32.const 1080
   f32.store
   local.get $4
   f32.const -312
   f32.store offset=4
   local.get $1
   i32.const 8
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=552
   local.get $4
   f32.const 1170
   f32.store
   local.get $4
   f32.const -156
   f32.store offset=4
   local.get $1
   i32.const 9
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=556
   local.get $4
   f32.const 1260
   f32.store
   local.get $4
   f32.const 0
   f32.store offset=4
   local.get $1
   i32.const 10
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=560
   local.get $4
   f32.const 1170
   f32.store
   local.get $4
   f32.const 156
   f32.store offset=4
   local.get $1
   i32.const 11
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=564
   local.get $4
   f32.const 1080
   f32.store
   local.get $4
   f32.const 312
   f32.store offset=4
   local.get $1
   i32.const 12
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=568
   local.get $4
   f32.const 990
   f32.store
   local.get $4
   f32.const 468
   f32.store offset=4
   local.get $1
   i32.const 13
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=572
   local.get $4
   f32.const 900
   f32.store
   local.get $4
   f32.const 624
   f32.store offset=4
   local.get $1
   i32.const 14
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=576
   local.get $4
   f32.const 810
   f32.store
   local.get $4
   f32.const 780
   f32.store offset=4
   local.get $1
   i32.const 15
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=580
   local.get $4
   f32.const 720
   f32.store
   local.get $4
   f32.const 936
   f32.store offset=4
   local.get $1
   i32.const 16
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=584
   local.get $4
   f32.const 630
   f32.store
   local.get $4
   f32.const 1092
   f32.store offset=4
   local.get $1
   i32.const 17
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=588
   local.get $4
   f32.const 450
   f32.store
   local.get $4
   f32.const 1092
   f32.store offset=4
   local.get $1
   i32.const 18
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=592
   local.get $4
   f32.const 270
   f32.store
   local.get $4
   f32.const 1092
   f32.store offset=4
   local.get $1
   i32.const 19
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=596
   local.get $4
   f32.const 90
   f32.store
   local.get $4
   f32.const 1092
   f32.store offset=4
   local.get $1
   i32.const 20
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=600
   local.get $4
   f32.const -90
   f32.store
   local.get $4
   f32.const 1092
   f32.store offset=4
   local.get $1
   i32.const 21
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=604
   local.get $4
   f32.const -270
   f32.store
   local.get $4
   f32.const 1092
   f32.store offset=4
   local.get $1
   i32.const 22
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=608
   local.get $4
   f32.const -450
   f32.store
   local.get $4
   f32.const 1092
   f32.store offset=4
   local.get $1
   i32.const 23
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=612
   local.get $4
   f32.const -630
   f32.store
   local.get $4
   f32.const 1092
   f32.store offset=4
   local.get $1
   i32.const 24
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=616
   local.get $4
   f32.const -720
   f32.store
   local.get $4
   f32.const 936
   f32.store offset=4
   local.get $1
   i32.const 25
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=620
   local.get $4
   f32.const -810
   f32.store
   local.get $4
   f32.const 780
   f32.store offset=4
   local.get $1
   i32.const 26
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=624
   local.get $4
   f32.const -900
   f32.store
   local.get $4
   f32.const 624
   f32.store offset=4
   local.get $1
   i32.const 27
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=628
   local.get $4
   f32.const -990
   f32.store
   local.get $4
   f32.const 468
   f32.store offset=4
   local.get $1
   i32.const 28
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=632
   local.get $4
   f32.const -1080
   f32.store
   local.get $4
   f32.const 312
   f32.store offset=4
   local.get $1
   i32.const 29
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=636
   local.get $4
   f32.const -1170
   f32.store
   local.get $4
   f32.const 156
   f32.store offset=4
   local.get $1
   i32.const 30
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=640
   local.get $4
   f32.const -1260
   f32.store
   local.get $4
   f32.const 0
   f32.store offset=4
   local.get $1
   i32.const 31
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=644
   local.get $4
   f32.const -1170
   f32.store
   local.get $4
   f32.const -156
   f32.store offset=4
   local.get $1
   i32.const 32
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=648
   local.get $4
   f32.const -1080
   f32.store
   local.get $4
   f32.const -312
   f32.store offset=4
   local.get $1
   i32.const 33
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=652
   local.get $4
   f32.const -990
   f32.store
   local.get $4
   f32.const -468
   f32.store offset=4
   local.get $1
   i32.const 34
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=656
   local.get $4
   f32.const -900
   f32.store
   local.get $4
   f32.const -624
   f32.store offset=4
   local.get $1
   i32.const 35
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=660
   local.get $4
   f32.const -810
   f32.store
   local.get $4
   f32.const -780
   f32.store offset=4
   local.get $1
   i32.const 36
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=664
   local.get $4
   f32.const -720
   f32.store
   local.get $4
   f32.const -936
   f32.store offset=4
   local.get $1
   i32.const 37
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=668
   local.get $4
   f32.const -630
   f32.store
   local.get $4
   f32.const -1092
   f32.store offset=4
   local.get $1
   i32.const 38
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=672
   local.get $4
   f32.const -450
   f32.store
   local.get $4
   f32.const -1092
   f32.store offset=4
   local.get $1
   i32.const 39
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=676
   local.get $4
   f32.const -270
   f32.store
   local.get $4
   f32.const -1092
   f32.store offset=4
   local.get $1
   i32.const 40
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=680
   local.get $4
   f32.const -90
   f32.store
   local.get $4
   f32.const -1092
   f32.store offset=4
   local.get $1
   i32.const 41
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   local.get $0
   i32.const 7
   local.get $1
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 192
   i32.const 5
   call $~lib/rt/itcms/__new
   local.tee $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=684
   local.get $4
   f32.const 0
   f32.store
   local.get $4
   f32.const -1248
   f32.store offset=4
   local.get $1
   i32.const 0
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=688
   local.get $4
   f32.const 180
   f32.store
   local.get $4
   f32.const -1248
   f32.store offset=4
   local.get $1
   i32.const 1
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=692
   local.get $4
   f32.const 360
   f32.store
   local.get $4
   f32.const -1248
   f32.store offset=4
   local.get $1
   i32.const 2
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=696
   local.get $4
   f32.const 540
   f32.store
   local.get $4
   f32.const -1248
   f32.store offset=4
   local.get $1
   i32.const 3
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=700
   local.get $4
   f32.const 720
   f32.store
   local.get $4
   f32.const -1248
   f32.store offset=4
   local.get $1
   i32.const 4
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=704
   local.get $4
   f32.const 810
   f32.store
   local.get $4
   f32.const -1092
   f32.store offset=4
   local.get $1
   i32.const 5
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=708
   local.get $4
   f32.const 900
   f32.store
   local.get $4
   f32.const -936
   f32.store offset=4
   local.get $1
   i32.const 6
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=712
   local.get $4
   f32.const 990
   f32.store
   local.get $4
   f32.const -780
   f32.store offset=4
   local.get $1
   i32.const 7
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=716
   local.get $4
   f32.const 1080
   f32.store
   local.get $4
   f32.const -624
   f32.store offset=4
   local.get $1
   i32.const 8
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=720
   local.get $4
   f32.const 1170
   f32.store
   local.get $4
   f32.const -468
   f32.store offset=4
   local.get $1
   i32.const 9
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=724
   local.get $4
   f32.const 1260
   f32.store
   local.get $4
   f32.const -312
   f32.store offset=4
   local.get $1
   i32.const 10
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=728
   local.get $4
   f32.const 1350
   f32.store
   local.get $4
   f32.const -156
   f32.store offset=4
   local.get $1
   i32.const 11
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=732
   local.get $4
   f32.const 1440
   f32.store
   local.get $4
   f32.const 0
   f32.store offset=4
   local.get $1
   i32.const 12
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=736
   local.get $4
   f32.const 1350
   f32.store
   local.get $4
   f32.const 156
   f32.store offset=4
   local.get $1
   i32.const 13
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=740
   local.get $4
   f32.const 1260
   f32.store
   local.get $4
   f32.const 312
   f32.store offset=4
   local.get $1
   i32.const 14
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=744
   local.get $4
   f32.const 1170
   f32.store
   local.get $4
   f32.const 468
   f32.store offset=4
   local.get $1
   i32.const 15
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=748
   local.get $4
   f32.const 1080
   f32.store
   local.get $4
   f32.const 624
   f32.store offset=4
   local.get $1
   i32.const 16
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=752
   local.get $4
   f32.const 990
   f32.store
   local.get $4
   f32.const 780
   f32.store offset=4
   local.get $1
   i32.const 17
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=756
   local.get $4
   f32.const 900
   f32.store
   local.get $4
   f32.const 936
   f32.store offset=4
   local.get $1
   i32.const 18
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=760
   local.get $4
   f32.const 810
   f32.store
   local.get $4
   f32.const 1092
   f32.store offset=4
   local.get $1
   i32.const 19
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=764
   local.get $4
   f32.const 720
   f32.store
   local.get $4
   f32.const 1248
   f32.store offset=4
   local.get $1
   i32.const 20
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=768
   local.get $4
   f32.const 540
   f32.store
   local.get $4
   f32.const 1248
   f32.store offset=4
   local.get $1
   i32.const 21
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=772
   local.get $4
   f32.const 360
   f32.store
   local.get $4
   f32.const 1248
   f32.store offset=4
   local.get $1
   i32.const 22
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=776
   local.get $4
   f32.const 180
   f32.store
   local.get $4
   f32.const 1248
   f32.store offset=4
   local.get $1
   i32.const 23
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=780
   local.get $4
   f32.const 0
   f32.store
   local.get $4
   f32.const 1248
   f32.store offset=4
   local.get $1
   i32.const 24
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=784
   local.get $4
   f32.const -180
   f32.store
   local.get $4
   f32.const 1248
   f32.store offset=4
   local.get $1
   i32.const 25
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=788
   local.get $4
   f32.const -360
   f32.store
   local.get $4
   f32.const 1248
   f32.store offset=4
   local.get $1
   i32.const 26
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=792
   local.get $4
   f32.const -540
   f32.store
   local.get $4
   f32.const 1248
   f32.store offset=4
   local.get $1
   i32.const 27
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=796
   local.get $4
   f32.const -720
   f32.store
   local.get $4
   f32.const 1248
   f32.store offset=4
   local.get $1
   i32.const 28
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=800
   local.get $4
   f32.const -810
   f32.store
   local.get $4
   f32.const 1092
   f32.store offset=4
   local.get $1
   i32.const 29
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=804
   local.get $4
   f32.const -900
   f32.store
   local.get $4
   f32.const 936
   f32.store offset=4
   local.get $1
   i32.const 30
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=808
   local.get $4
   f32.const -990
   f32.store
   local.get $4
   f32.const 780
   f32.store offset=4
   local.get $1
   i32.const 31
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=812
   local.get $4
   f32.const -1080
   f32.store
   local.get $4
   f32.const 624
   f32.store offset=4
   local.get $1
   i32.const 32
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=816
   local.get $4
   f32.const -1170
   f32.store
   local.get $4
   f32.const 468
   f32.store offset=4
   local.get $1
   i32.const 33
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=820
   local.get $4
   f32.const -1260
   f32.store
   local.get $4
   f32.const 312
   f32.store offset=4
   local.get $1
   i32.const 34
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=824
   local.get $4
   f32.const -1350
   f32.store
   local.get $4
   f32.const 156
   f32.store offset=4
   local.get $1
   i32.const 35
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=828
   local.get $4
   f32.const -1440
   f32.store
   local.get $4
   f32.const 0
   f32.store offset=4
   local.get $1
   i32.const 36
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=832
   local.get $4
   f32.const -1350
   f32.store
   local.get $4
   f32.const -156
   f32.store offset=4
   local.get $1
   i32.const 37
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=836
   local.get $4
   f32.const -1260
   f32.store
   local.get $4
   f32.const -312
   f32.store offset=4
   local.get $1
   i32.const 38
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=840
   local.get $4
   f32.const -1170
   f32.store
   local.get $4
   f32.const -468
   f32.store offset=4
   local.get $1
   i32.const 39
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=844
   local.get $4
   f32.const -1080
   f32.store
   local.get $4
   f32.const -624
   f32.store offset=4
   local.get $1
   i32.const 40
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=848
   local.get $4
   f32.const -990
   f32.store
   local.get $4
   f32.const -780
   f32.store offset=4
   local.get $1
   i32.const 41
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=852
   local.get $4
   f32.const -900
   f32.store
   local.get $4
   f32.const -936
   f32.store offset=4
   local.get $1
   i32.const 42
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=856
   local.get $4
   f32.const -810
   f32.store
   local.get $4
   f32.const -1092
   f32.store offset=4
   local.get $1
   i32.const 43
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=860
   local.get $4
   f32.const -720
   f32.store
   local.get $4
   f32.const -1248
   f32.store offset=4
   local.get $1
   i32.const 44
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=864
   local.get $4
   f32.const -540
   f32.store
   local.get $4
   f32.const -1248
   f32.store offset=4
   local.get $1
   i32.const 45
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=868
   local.get $4
   f32.const -360
   f32.store
   local.get $4
   f32.const -1248
   f32.store offset=4
   local.get $1
   i32.const 46
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=872
   local.get $4
   f32.const -180
   f32.store
   local.get $4
   f32.const -1248
   f32.store offset=4
   local.get $1
   i32.const 47
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   local.get $0
   i32.const 8
   local.get $1
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 216
   i32.const 5
   call $~lib/rt/itcms/__new
   local.tee $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=876
   local.get $4
   f32.const 90
   f32.store
   local.get $4
   f32.const -1404
   f32.store offset=4
   local.get $1
   i32.const 0
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=880
   local.get $4
   f32.const 270
   f32.store
   local.get $4
   f32.const -1404
   f32.store offset=4
   local.get $1
   i32.const 1
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=884
   local.get $4
   f32.const 450
   f32.store
   local.get $4
   f32.const -1404
   f32.store offset=4
   local.get $1
   i32.const 2
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=888
   local.get $4
   f32.const 630
   f32.store
   local.get $4
   f32.const -1404
   f32.store offset=4
   local.get $1
   i32.const 3
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=892
   local.get $4
   f32.const 810
   f32.store
   local.get $4
   f32.const -1404
   f32.store offset=4
   local.get $1
   i32.const 4
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=896
   local.get $4
   f32.const 900
   f32.store
   local.get $4
   f32.const -1248
   f32.store offset=4
   local.get $1
   i32.const 5
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=900
   local.get $4
   f32.const 990
   f32.store
   local.get $4
   f32.const -1092
   f32.store offset=4
   local.get $1
   i32.const 6
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=904
   local.get $4
   f32.const 1080
   f32.store
   local.get $4
   f32.const -936
   f32.store offset=4
   local.get $1
   i32.const 7
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=908
   local.get $4
   f32.const 1170
   f32.store
   local.get $4
   f32.const -780
   f32.store offset=4
   local.get $1
   i32.const 8
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=912
   local.get $4
   f32.const 1260
   f32.store
   local.get $4
   f32.const -624
   f32.store offset=4
   local.get $1
   i32.const 9
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=916
   local.get $4
   f32.const 1350
   f32.store
   local.get $4
   f32.const -468
   f32.store offset=4
   local.get $1
   i32.const 10
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=920
   local.get $4
   f32.const 1440
   f32.store
   local.get $4
   f32.const -312
   f32.store offset=4
   local.get $1
   i32.const 11
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=924
   local.get $4
   f32.const 1530
   f32.store
   local.get $4
   f32.const -156
   f32.store offset=4
   local.get $1
   i32.const 12
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=928
   local.get $4
   f32.const 1620
   f32.store
   local.get $4
   f32.const 0
   f32.store offset=4
   local.get $1
   i32.const 13
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=932
   local.get $4
   f32.const 1530
   f32.store
   local.get $4
   f32.const 156
   f32.store offset=4
   local.get $1
   i32.const 14
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=936
   local.get $4
   f32.const 1440
   f32.store
   local.get $4
   f32.const 312
   f32.store offset=4
   local.get $1
   i32.const 15
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=940
   local.get $4
   f32.const 1350
   f32.store
   local.get $4
   f32.const 468
   f32.store offset=4
   local.get $1
   i32.const 16
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=944
   local.get $4
   f32.const 1260
   f32.store
   local.get $4
   f32.const 624
   f32.store offset=4
   local.get $1
   i32.const 17
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=948
   local.get $4
   f32.const 1170
   f32.store
   local.get $4
   f32.const 780
   f32.store offset=4
   local.get $1
   i32.const 18
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=952
   local.get $4
   f32.const 1080
   f32.store
   local.get $4
   f32.const 936
   f32.store offset=4
   local.get $1
   i32.const 19
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=956
   local.get $4
   f32.const 990
   f32.store
   local.get $4
   f32.const 1092
   f32.store offset=4
   local.get $1
   i32.const 20
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=960
   local.get $4
   f32.const 900
   f32.store
   local.get $4
   f32.const 1248
   f32.store offset=4
   local.get $1
   i32.const 21
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=964
   local.get $4
   f32.const 810
   f32.store
   local.get $4
   f32.const 1404
   f32.store offset=4
   local.get $1
   i32.const 22
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=968
   local.get $4
   f32.const 630
   f32.store
   local.get $4
   f32.const 1404
   f32.store offset=4
   local.get $1
   i32.const 23
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=972
   local.get $4
   f32.const 450
   f32.store
   local.get $4
   f32.const 1404
   f32.store offset=4
   local.get $1
   i32.const 24
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=976
   local.get $4
   f32.const 270
   f32.store
   local.get $4
   f32.const 1404
   f32.store offset=4
   local.get $1
   i32.const 25
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=980
   local.get $4
   f32.const 90
   f32.store
   local.get $4
   f32.const 1404
   f32.store offset=4
   local.get $1
   i32.const 26
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=984
   local.get $4
   f32.const -90
   f32.store
   local.get $4
   f32.const 1404
   f32.store offset=4
   local.get $1
   i32.const 27
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=988
   local.get $4
   f32.const -270
   f32.store
   local.get $4
   f32.const 1404
   f32.store offset=4
   local.get $1
   i32.const 28
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=992
   local.get $4
   f32.const -450
   f32.store
   local.get $4
   f32.const 1404
   f32.store offset=4
   local.get $1
   i32.const 29
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=996
   local.get $4
   f32.const -630
   f32.store
   local.get $4
   f32.const 1404
   f32.store offset=4
   local.get $1
   i32.const 30
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1000
   local.get $4
   f32.const -810
   f32.store
   local.get $4
   f32.const 1404
   f32.store offset=4
   local.get $1
   i32.const 31
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1004
   local.get $4
   f32.const -900
   f32.store
   local.get $4
   f32.const 1248
   f32.store offset=4
   local.get $1
   i32.const 32
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1008
   local.get $4
   f32.const -990
   f32.store
   local.get $4
   f32.const 1092
   f32.store offset=4
   local.get $1
   i32.const 33
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1012
   local.get $4
   f32.const -1080
   f32.store
   local.get $4
   f32.const 936
   f32.store offset=4
   local.get $1
   i32.const 34
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1016
   local.get $4
   f32.const -1170
   f32.store
   local.get $4
   f32.const 780
   f32.store offset=4
   local.get $1
   i32.const 35
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1020
   local.get $4
   f32.const -1260
   f32.store
   local.get $4
   f32.const 624
   f32.store offset=4
   local.get $1
   i32.const 36
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1024
   local.get $4
   f32.const -1350
   f32.store
   local.get $4
   f32.const 468
   f32.store offset=4
   local.get $1
   i32.const 37
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1028
   local.get $4
   f32.const -1440
   f32.store
   local.get $4
   f32.const 312
   f32.store offset=4
   local.get $1
   i32.const 38
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1032
   local.get $4
   f32.const -1530
   f32.store
   local.get $4
   f32.const 156
   f32.store offset=4
   local.get $1
   i32.const 39
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1036
   local.get $4
   f32.const -1620
   f32.store
   local.get $4
   f32.const 0
   f32.store offset=4
   local.get $1
   i32.const 40
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1040
   local.get $4
   f32.const -1530
   f32.store
   local.get $4
   f32.const -156
   f32.store offset=4
   local.get $1
   i32.const 41
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1044
   local.get $4
   f32.const -1440
   f32.store
   local.get $4
   f32.const -312
   f32.store offset=4
   local.get $1
   i32.const 42
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1048
   local.get $4
   f32.const -1350
   f32.store
   local.get $4
   f32.const -468
   f32.store offset=4
   local.get $1
   i32.const 43
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1052
   local.get $4
   f32.const -1260
   f32.store
   local.get $4
   f32.const -624
   f32.store offset=4
   local.get $1
   i32.const 44
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1056
   local.get $4
   f32.const -1170
   f32.store
   local.get $4
   f32.const -780
   f32.store offset=4
   local.get $1
   i32.const 45
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1060
   local.get $4
   f32.const -1080
   f32.store
   local.get $4
   f32.const -936
   f32.store offset=4
   local.get $1
   i32.const 46
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1064
   local.get $4
   f32.const -990
   f32.store
   local.get $4
   f32.const -1092
   f32.store offset=4
   local.get $1
   i32.const 47
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1068
   local.get $4
   f32.const -900
   f32.store
   local.get $4
   f32.const -1248
   f32.store offset=4
   local.get $1
   i32.const 48
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1072
   local.get $4
   f32.const -810
   f32.store
   local.get $4
   f32.const -1404
   f32.store offset=4
   local.get $1
   i32.const 49
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1076
   local.get $4
   f32.const -630
   f32.store
   local.get $4
   f32.const -1404
   f32.store offset=4
   local.get $1
   i32.const 50
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1080
   local.get $4
   f32.const -450
   f32.store
   local.get $4
   f32.const -1404
   f32.store offset=4
   local.get $1
   i32.const 51
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1084
   local.get $4
   f32.const -270
   f32.store
   local.get $4
   f32.const -1404
   f32.store offset=4
   local.get $1
   i32.const 52
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1088
   local.get $4
   f32.const -90
   f32.store
   local.get $4
   f32.const -1404
   f32.store offset=4
   local.get $1
   i32.const 53
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   local.get $0
   i32.const 9
   local.get $1
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 240
   i32.const 5
   call $~lib/rt/itcms/__new
   local.tee $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1092
   local.get $4
   f32.const 0
   f32.store
   local.get $4
   f32.const -1560
   f32.store offset=4
   local.get $1
   i32.const 0
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1096
   local.get $4
   f32.const 180
   f32.store
   local.get $4
   f32.const -1560
   f32.store offset=4
   local.get $1
   i32.const 1
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1100
   local.get $4
   f32.const 360
   f32.store
   local.get $4
   f32.const -1560
   f32.store offset=4
   local.get $1
   i32.const 2
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1104
   local.get $4
   f32.const 540
   f32.store
   local.get $4
   f32.const -1560
   f32.store offset=4
   local.get $1
   i32.const 3
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1108
   local.get $4
   f32.const 720
   f32.store
   local.get $4
   f32.const -1560
   f32.store offset=4
   local.get $1
   i32.const 4
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1112
   local.get $4
   f32.const 900
   f32.store
   local.get $4
   f32.const -1560
   f32.store offset=4
   local.get $1
   i32.const 5
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1116
   local.get $4
   f32.const 990
   f32.store
   local.get $4
   f32.const -1404
   f32.store offset=4
   local.get $1
   i32.const 6
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1120
   local.get $4
   f32.const 1080
   f32.store
   local.get $4
   f32.const -1248
   f32.store offset=4
   local.get $1
   i32.const 7
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1124
   local.get $4
   f32.const 1170
   f32.store
   local.get $4
   f32.const -1092
   f32.store offset=4
   local.get $1
   i32.const 8
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1128
   local.get $4
   f32.const 1260
   f32.store
   local.get $4
   f32.const -936
   f32.store offset=4
   local.get $1
   i32.const 9
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1132
   local.get $4
   f32.const 1350
   f32.store
   local.get $4
   f32.const -780
   f32.store offset=4
   local.get $1
   i32.const 10
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1136
   local.get $4
   f32.const 1440
   f32.store
   local.get $4
   f32.const -624
   f32.store offset=4
   local.get $1
   i32.const 11
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1140
   local.get $4
   f32.const 1530
   f32.store
   local.get $4
   f32.const -468
   f32.store offset=4
   local.get $1
   i32.const 12
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1144
   local.get $4
   f32.const 1620
   f32.store
   local.get $4
   f32.const -312
   f32.store offset=4
   local.get $1
   i32.const 13
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1148
   local.get $4
   f32.const 1710
   f32.store
   local.get $4
   f32.const -156
   f32.store offset=4
   local.get $1
   i32.const 14
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1152
   local.get $4
   f32.const 1800
   f32.store
   local.get $4
   f32.const 0
   f32.store offset=4
   local.get $1
   i32.const 15
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1156
   local.get $4
   f32.const 1710
   f32.store
   local.get $4
   f32.const 156
   f32.store offset=4
   local.get $1
   i32.const 16
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1160
   local.get $4
   f32.const 1620
   f32.store
   local.get $4
   f32.const 312
   f32.store offset=4
   local.get $1
   i32.const 17
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1164
   local.get $4
   f32.const 1530
   f32.store
   local.get $4
   f32.const 468
   f32.store offset=4
   local.get $1
   i32.const 18
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1168
   local.get $4
   f32.const 1440
   f32.store
   local.get $4
   f32.const 624
   f32.store offset=4
   local.get $1
   i32.const 19
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1172
   local.get $4
   f32.const 1350
   f32.store
   local.get $4
   f32.const 780
   f32.store offset=4
   local.get $1
   i32.const 20
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1176
   local.get $4
   f32.const 1260
   f32.store
   local.get $4
   f32.const 936
   f32.store offset=4
   local.get $1
   i32.const 21
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1180
   local.get $4
   f32.const 1170
   f32.store
   local.get $4
   f32.const 1092
   f32.store offset=4
   local.get $1
   i32.const 22
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1184
   local.get $4
   f32.const 1080
   f32.store
   local.get $4
   f32.const 1248
   f32.store offset=4
   local.get $1
   i32.const 23
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1188
   local.get $4
   f32.const 990
   f32.store
   local.get $4
   f32.const 1404
   f32.store offset=4
   local.get $1
   i32.const 24
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1192
   local.get $4
   f32.const 900
   f32.store
   local.get $4
   f32.const 1560
   f32.store offset=4
   local.get $1
   i32.const 25
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1196
   local.get $4
   f32.const 720
   f32.store
   local.get $4
   f32.const 1560
   f32.store offset=4
   local.get $1
   i32.const 26
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1200
   local.get $4
   f32.const 540
   f32.store
   local.get $4
   f32.const 1560
   f32.store offset=4
   local.get $1
   i32.const 27
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1204
   local.get $4
   f32.const 360
   f32.store
   local.get $4
   f32.const 1560
   f32.store offset=4
   local.get $1
   i32.const 28
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1208
   local.get $4
   f32.const 180
   f32.store
   local.get $4
   f32.const 1560
   f32.store offset=4
   local.get $1
   i32.const 29
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1212
   local.get $4
   f32.const 0
   f32.store
   local.get $4
   f32.const 1560
   f32.store offset=4
   local.get $1
   i32.const 30
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1216
   local.get $4
   f32.const -180
   f32.store
   local.get $4
   f32.const 1560
   f32.store offset=4
   local.get $1
   i32.const 31
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1220
   local.get $4
   f32.const -360
   f32.store
   local.get $4
   f32.const 1560
   f32.store offset=4
   local.get $1
   i32.const 32
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1224
   local.get $4
   f32.const -540
   f32.store
   local.get $4
   f32.const 1560
   f32.store offset=4
   local.get $1
   i32.const 33
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1228
   local.get $4
   f32.const -720
   f32.store
   local.get $4
   f32.const 1560
   f32.store offset=4
   local.get $1
   i32.const 34
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1232
   local.get $4
   f32.const -900
   f32.store
   local.get $4
   f32.const 1560
   f32.store offset=4
   local.get $1
   i32.const 35
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1236
   local.get $4
   f32.const -990
   f32.store
   local.get $4
   f32.const 1404
   f32.store offset=4
   local.get $1
   i32.const 36
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1240
   local.get $4
   f32.const -1080
   f32.store
   local.get $4
   f32.const 1248
   f32.store offset=4
   local.get $1
   i32.const 37
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1244
   local.get $4
   f32.const -1170
   f32.store
   local.get $4
   f32.const 1092
   f32.store offset=4
   local.get $1
   i32.const 38
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1248
   local.get $4
   f32.const -1260
   f32.store
   local.get $4
   f32.const 936
   f32.store offset=4
   local.get $1
   i32.const 39
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1252
   local.get $4
   f32.const -1350
   f32.store
   local.get $4
   f32.const 780
   f32.store offset=4
   local.get $1
   i32.const 40
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1256
   local.get $4
   f32.const -1440
   f32.store
   local.get $4
   f32.const 624
   f32.store offset=4
   local.get $1
   i32.const 41
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1260
   local.get $4
   f32.const -1530
   f32.store
   local.get $4
   f32.const 468
   f32.store offset=4
   local.get $1
   i32.const 42
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1264
   local.get $4
   f32.const -1620
   f32.store
   local.get $4
   f32.const 312
   f32.store offset=4
   local.get $1
   i32.const 43
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1268
   local.get $4
   f32.const -1710
   f32.store
   local.get $4
   f32.const 156
   f32.store offset=4
   local.get $1
   i32.const 44
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1272
   local.get $4
   f32.const -1800
   f32.store
   local.get $4
   f32.const 0
   f32.store offset=4
   local.get $1
   i32.const 45
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1276
   local.get $4
   f32.const -1710
   f32.store
   local.get $4
   f32.const -156
   f32.store offset=4
   local.get $1
   i32.const 46
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1280
   local.get $4
   f32.const -1620
   f32.store
   local.get $4
   f32.const -312
   f32.store offset=4
   local.get $1
   i32.const 47
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1284
   local.get $4
   f32.const -1530
   f32.store
   local.get $4
   f32.const -468
   f32.store offset=4
   local.get $1
   i32.const 48
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1288
   local.get $4
   f32.const -1440
   f32.store
   local.get $4
   f32.const -624
   f32.store offset=4
   local.get $1
   i32.const 49
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1292
   local.get $4
   f32.const -1350
   f32.store
   local.get $4
   f32.const -780
   f32.store offset=4
   local.get $1
   i32.const 50
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1296
   local.get $4
   f32.const -1260
   f32.store
   local.get $4
   f32.const -936
   f32.store offset=4
   local.get $1
   i32.const 51
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1300
   local.get $4
   f32.const -1170
   f32.store
   local.get $4
   f32.const -1092
   f32.store offset=4
   local.get $1
   i32.const 52
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1304
   local.get $4
   f32.const -1080
   f32.store
   local.get $4
   f32.const -1248
   f32.store offset=4
   local.get $1
   i32.const 53
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1308
   local.get $4
   f32.const -990
   f32.store
   local.get $4
   f32.const -1404
   f32.store offset=4
   local.get $1
   i32.const 54
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1312
   local.get $4
   f32.const -900
   f32.store
   local.get $4
   f32.const -1560
   f32.store offset=4
   local.get $1
   i32.const 55
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1316
   local.get $4
   f32.const -720
   f32.store
   local.get $4
   f32.const -1560
   f32.store offset=4
   local.get $1
   i32.const 56
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1320
   local.get $4
   f32.const -540
   f32.store
   local.get $4
   f32.const -1560
   f32.store offset=4
   local.get $1
   i32.const 57
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1324
   local.get $4
   f32.const -360
   f32.store
   local.get $4
   f32.const -1560
   f32.store offset=4
   local.get $1
   i32.const 58
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store offset=1328
   local.get $4
   f32.const -180
   f32.store
   local.get $4
   f32.const -1560
   f32.store offset=4
   local.get $1
   i32.const 59
   local.get $4
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   local.get $0
   i32.const 10
   local.get $1
   call $~lib/staticarray/StaticArray<logic/geom-types/Point>#__uset
   local.get $0
   global.set $logic/hex-positions/HEX_POSITIONS
   global.get $~lib/memory/__stack_pointer
   i32.const 1332
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $start:logic/factory
  (local $0 i32)
  (local $1 i64)
  (local $2 f32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   local.tee $3
   i32.const 0
   i32.store
   memory.size
   i32.const 16
   i32.shl
   i32.const 23172
   i32.sub
   i32.const 1
   i32.shr_u
   global.set $~lib/rt/itcms/threshold
   i32.const 1284
   i32.const 1280
   i32.store
   i32.const 1288
   i32.const 1280
   i32.store
   i32.const 1280
   global.set $~lib/rt/itcms/pinSpace
   i32.const 1316
   i32.const 1312
   i32.store
   i32.const 1320
   i32.const 1312
   i32.store
   i32.const 1312
   global.set $~lib/rt/itcms/toSpace
   i32.const 1460
   i32.const 1456
   i32.store
   i32.const 1464
   i32.const 1456
   i32.store
   i32.const 1456
   global.set $~lib/rt/itcms/fromSpace
   local.get $3
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   local.tee $3
   i32.const 0
   i32.store
   local.get $3
   i32.const 1024
   i32.const 3
   call $~lib/rt/itcms/__new
   local.tee $3
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $3
   global.set $logic/get-random/lookUpTable
   loop $for-loop|0
    local.get $0
    i32.const 256
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     global.get $logic/get-random/lookUpTable
     local.tee $4
     i32.store
     global.get $~lib/math/random_seeded
     i32.eqz
     if
      call $~lib/builtins/seed
      i64.reinterpret_f64
      local.tee $1
      i64.eqz
      if (result i64)
       i64.const -7046029254386353131
      else
       local.get $1
      end
      i32.wrap_i64
      i32.const 1831565813
      i32.add
      local.tee $3
      i32.const 1
      i32.or
      local.get $3
      i32.const 15
      i32.shr_u
      local.get $3
      i32.xor
      i32.mul
      local.tee $3
      local.get $3
      i32.const 61
      i32.or
      local.get $3
      i32.const 7
      i32.shr_u
      local.get $3
      i32.xor
      i32.mul
      i32.add
      local.get $3
      i32.xor
      local.tee $3
      i32.const 14
      i32.shr_u
      local.get $3
      i32.xor
      global.set $~lib/math/random_state0_32
      global.get $~lib/math/random_state0_32
      i32.const 1831565813
      i32.add
      local.tee $3
      i32.const 1
      i32.or
      local.get $3
      i32.const 15
      i32.shr_u
      local.get $3
      i32.xor
      i32.mul
      local.tee $3
      local.get $3
      i32.const 61
      i32.or
      local.get $3
      i32.const 7
      i32.shr_u
      local.get $3
      i32.xor
      i32.mul
      i32.add
      local.get $3
      i32.xor
      local.tee $3
      i32.const 14
      i32.shr_u
      local.get $3
      i32.xor
      global.set $~lib/math/random_state1_32
      i32.const 1
      global.set $~lib/math/random_seeded
     end
     global.get $~lib/math/random_state0_32
     local.tee $5
     global.get $~lib/math/random_state1_32
     i32.xor
     local.tee $3
     local.get $5
     i32.const 26
     i32.rotl
     i32.xor
     local.get $3
     i32.const 9
     i32.shl
     i32.xor
     global.set $~lib/math/random_state0_32
     local.get $3
     i32.const 13
     i32.rotl
     global.set $~lib/math/random_state1_32
     local.get $4
     i32.const 20
     i32.sub
     i32.load offset=16
     i32.const 2
     i32.shr_u
     local.get $0
     i32.le_u
     if
      i32.const 1360
      i32.const 1104
      i32.const 133
      i32.const 41
      call $~lib/builtins/abort
      unreachable
     end
     local.get $0
     i32.const 2
     i32.shl
     local.get $4
     i32.add
     local.get $5
     i32.const -1640531525
     i32.mul
     i32.const 5
     i32.rotl
     i32.const 5
     i32.mul
     i32.const 9
     i32.shr_u
     i32.const 1065353216
     i32.or
     f32.reinterpret_i32
     f32.const 1
     f32.sub
     f32.store
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   call $start:logic/position-utils
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   local.tee $0
   i64.const 0
   i64.store
   local.get $0
   i64.const 0
   i64.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 24
   i32.sub
   global.set $~lib/memory/__stack_pointer
   block $__inlined_func$start:logic/ability-details
    block $folding-inner0
     global.get $~lib/memory/__stack_pointer
     i32.const 6788
     i32.lt_s
     br_if $folding-inner0
     global.get $~lib/memory/__stack_pointer
     local.tee $0
     i64.const 0
     i64.store
     local.get $0
     i64.const 0
     i64.store offset=8
     local.get $0
     i64.const 0
     i64.store offset=16
     call $start:logic/bullets-manager
     global.get $~lib/memory/__stack_pointer
     i32.const 4
     i32.sub
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 6788
     i32.lt_s
     br_if $folding-inner0
     global.get $~lib/memory/__stack_pointer
     local.tee $0
     i32.const 0
     i32.store
     local.get $0
     i32.const 24
     i32.const 29
     call $~lib/rt/itcms/__new
     local.tee $0
     i32.store
     local.get $0
     i32.const 16
     call $~lib/arraybuffer/ArrayBuffer#constructor
     local.tee $3
     i32.store
     local.get $3
     if
      local.get $0
      local.get $3
      i32.const 0
      call $byn-split-outlined-A$~lib/rt/itcms/__link
     end
     local.get $0
     i32.const 3
     i32.store offset=4
     local.get $0
     i32.const 48
     call $~lib/arraybuffer/ArrayBuffer#constructor
     local.tee $3
     i32.store offset=8
     local.get $3
     if
      local.get $0
      local.get $3
      i32.const 0
      call $byn-split-outlined-A$~lib/rt/itcms/__link
     end
     local.get $0
     i32.const 4
     i32.store offset=12
     local.get $0
     i32.const 0
     i32.store offset=16
     local.get $0
     i32.const 0
     i32.store offset=20
     global.get $~lib/memory/__stack_pointer
     i32.const 4
     i32.add
     global.set $~lib/memory/__stack_pointer
     local.get $0
     global.set $logic/ability-details/ABILITY_DETAILS
     global.get $~lib/memory/__stack_pointer
     global.get $logic/ability-details/ABILITY_DETAILS
     local.tee $0
     i32.store
     global.get $~lib/memory/__stack_pointer
     call $logic/ability-details/Ability#constructor
     local.tee $3
     i32.store offset=8
     local.get $3
     i32.const 0
     i32.store
     local.get $3
     i32.const 1200
     i32.store16 offset=4
     local.get $3
     i32.const 0
     i32.store8 offset=6
     local.get $3
     f32.const 600
     f32.store offset=8
     local.get $3
     i32.const 1
     i32.store8 offset=12
     local.get $3
     i32.const 75
     i32.store16 offset=20
     global.get $~lib/memory/__stack_pointer
     call $logic/ability-details/Usage#constructor
     local.tee $4
     i32.store offset=12
     local.get $4
     i32.const 1
     i32.store8
     local.get $4
     i32.const 0
     i32.store8 offset=1
     local.get $3
     local.get $4
     i32.store offset=16
     local.get $4
     if
      local.get $3
      local.get $4
      i32.const 0
      call $byn-split-outlined-A$~lib/rt/itcms/__link
     end
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store offset=4
     local.get $0
     i32.const 0
     local.get $3
     call $~lib/map/Map<i32,logic/weapon-details/WeaponDetails>#set
     global.get $~lib/memory/__stack_pointer
     global.get $logic/ability-details/ABILITY_DETAILS
     local.tee $0
     i32.store
     global.get $~lib/memory/__stack_pointer
     call $logic/ability-details/Ability#constructor
     local.tee $3
     i32.store offset=16
     local.get $3
     i32.const 1
     i32.store
     local.get $3
     i32.const 900
     i32.store16 offset=4
     local.get $3
     i32.const 1
     i32.store8 offset=6
     local.get $3
     f32.const 900
     f32.store offset=8
     local.get $3
     i32.const 0
     i32.store8 offset=12
     local.get $3
     i32.const 45
     i32.store16 offset=20
     global.get $~lib/memory/__stack_pointer
     call $logic/ability-details/Usage#constructor
     local.tee $4
     i32.store offset=20
     local.get $4
     i32.const 1
     i32.store8
     local.get $4
     i32.const 1
     i32.store8 offset=1
     local.get $3
     local.get $4
     i32.store offset=16
     local.get $4
     if
      local.get $3
      local.get $4
      i32.const 0
      call $byn-split-outlined-A$~lib/rt/itcms/__link
     end
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store offset=4
     local.get $0
     i32.const 1
     local.get $3
     call $~lib/map/Map<i32,logic/weapon-details/WeaponDetails>#set
     global.get $~lib/memory/__stack_pointer
     i32.const 24
     i32.add
     global.set $~lib/memory/__stack_pointer
     br $__inlined_func$start:logic/ability-details
    end
    i32.const 23200
    i32.const 23248
    i32.const 1
    i32.const 1
    call $~lib/builtins/abort
    unreachable
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   local.tee $0
   i32.const 0
   i32.store
   local.get $0
   i32.const 24
   i32.const 30
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store
   local.get $0
   i32.const 16
   call $~lib/arraybuffer/ArrayBuffer#constructor
   local.tee $3
   i32.store
   local.get $3
   if
    local.get $0
    local.get $3
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   local.get $0
   i32.const 3
   i32.store offset=4
   local.get $0
   i32.const 48
   call $~lib/arraybuffer/ArrayBuffer#constructor
   local.tee $3
   i32.store offset=8
   local.get $3
   if
    local.get $0
    local.get $3
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   local.get $0
   i32.const 4
   i32.store offset=12
   local.get $0
   i32.const 0
   i32.store offset=16
   local.get $0
   i32.const 0
   i32.store offset=20
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   global.set $logic/squad-details/SQUAD_DETAILS
   global.get $~lib/memory/__stack_pointer
   global.get $logic/squad-details/SQUAD_DETAILS
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   call $logic/squad-details/SquadDetails#constructor
   local.tee $3
   i32.store offset=8
   local.get $3
   f32.const 2
   f32.store
   local.get $3
   i32.const 60
   i32.store16 offset=4
   local.get $3
   i32.const 7
   i32.store8 offset=6
   local.get $3
   i32.const 100
   i32.store16 offset=8
   local.get $3
   f32.const 2.5
   f32.store offset=12
   local.get $3
   f32.const 40
   f32.store offset=16
   global.get $~lib/memory/__stack_pointer
   global.get $logic/ability-details/ABILITY_DETAILS
   local.tee $4
   i32.store offset=4
   local.get $3
   local.get $4
   i32.const 0
   call $~lib/map/Map<i32,logic/ability-details/Ability>#get
   local.tee $4
   i32.store offset=20
   local.get $4
   if
    local.get $3
    local.get $4
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=4
   local.get $0
   i32.const 2
   local.get $3
   call $~lib/map/Map<i32,logic/weapon-details/WeaponDetails>#set
   global.get $~lib/memory/__stack_pointer
   global.get $logic/squad-details/SQUAD_DETAILS
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   call $logic/squad-details/SquadDetails#constructor
   local.tee $3
   i32.store offset=12
   local.get $3
   f32.const 0
   f32.store
   local.get $3
   i32.const 0
   i32.store16 offset=4
   local.get $3
   i32.const 0
   i32.store8 offset=6
   local.get $3
   i32.const 2000
   i32.store16 offset=8
   local.get $3
   f32.const 0
   f32.store offset=12
   local.get $3
   f32.const 150
   f32.store offset=16
   local.get $3
   i32.const 0
   i32.store offset=20
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=4
   local.get $0
   i32.const 1
   local.get $3
   call $~lib/map/Map<i32,logic/weapon-details/WeaponDetails>#set
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   call $~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#constructor
   global.set $logic/track-manager/permanentObstaclesGraph
   call $start:logic/hex-positions
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $~lib/math/NativeMathf.atan (param $0 f32) (result f32)
  (local $1 f32)
  (local $2 i32)
  (local $3 i32)
  (local $4 f32)
  (local $5 f32)
  local.get $0
  local.set $1
  local.get $0
  i32.reinterpret_f32
  i32.const 2147483647
  i32.and
  local.tee $2
  i32.const 1283457024
  i32.ge_u
  if
   local.get $0
   local.get $0
   f32.ne
   if
    local.get $0
    return
   end
   f32.const 1.570796251296997
   local.get $1
   f32.copysign
   return
  end
  local.get $2
  i32.const 1054867456
  i32.lt_u
  if
   local.get $2
   i32.const 964689920
   i32.lt_u
   if
    local.get $0
    return
   end
   i32.const -1
   local.set $3
  else
   local.get $0
   f32.abs
   local.set $0
   local.get $2
   i32.const 1066926080
   i32.lt_u
   if (result f32)
    local.get $2
    i32.const 1060110336
    i32.lt_u
    if (result f32)
     local.get $0
     local.get $0
     f32.add
     f32.const 1
     f32.sub
     local.get $0
     f32.const 2
     f32.add
     f32.div
    else
     i32.const 1
     local.set $3
     local.get $0
     f32.const 1
     f32.sub
     local.get $0
     f32.const 1
     f32.add
     f32.div
    end
   else
    local.get $2
    i32.const 1075576832
    i32.lt_u
    if (result f32)
     i32.const 2
     local.set $3
     local.get $0
     f32.const 1.5
     f32.sub
     local.get $0
     f32.const 1.5
     f32.mul
     f32.const 1
     f32.add
     f32.div
    else
     i32.const 3
     local.set $3
     f32.const -1
     local.get $0
     f32.div
    end
   end
   local.set $0
  end
  local.get $0
  local.get $0
  f32.mul
  local.tee $5
  local.get $5
  f32.mul
  local.set $4
  local.get $0
  local.get $5
  local.get $4
  local.get $4
  f32.const 0.06168760731816292
  f32.mul
  f32.const 0.14253635704517365
  f32.add
  f32.mul
  f32.const 0.333333283662796
  f32.add
  f32.mul
  local.get $4
  local.get $4
  f32.const -0.106480173766613
  f32.mul
  f32.const -0.19999158382415771
  f32.add
  f32.mul
  f32.add
  f32.mul
  local.set $4
  local.get $3
  i32.const 0
  i32.lt_s
  if
   local.get $0
   local.get $4
   f32.sub
   return
  end
  block $break|0
   block $case4|0
    block $case3|0
     block $case2|0
      block $case1|0
       block $case0|0
        local.get $3
        br_table $case0|0 $case1|0 $case2|0 $case3|0 $case4|0
       end
       f32.const 0.46364760398864746
       local.get $4
       f32.const 5.01215824399992e-09
       f32.sub
       local.get $0
       f32.sub
       f32.sub
       local.set $0
       br $break|0
      end
      f32.const 0.7853981256484985
      local.get $4
      f32.const 3.774894707930798e-08
      f32.sub
      local.get $0
      f32.sub
      f32.sub
      local.set $0
      br $break|0
     end
     f32.const 0.9827936887741089
     local.get $4
     f32.const 3.447321716976148e-08
     f32.sub
     local.get $0
     f32.sub
     f32.sub
     local.set $0
     br $break|0
    end
    f32.const 1.570796251296997
    local.get $4
    f32.const 7.549789415861596e-08
    f32.sub
    local.get $0
    f32.sub
    f32.sub
    local.set $0
    br $break|0
   end
   unreachable
  end
  local.get $0
  local.get $1
  f32.copysign
 )
 (func $~lib/math/NativeMathf.atan2 (param $0 f32) (param $1 f32) (result f32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $0
  local.get $0
  f32.ne
  local.get $1
  local.get $1
  f32.ne
  i32.or
  if
   local.get $1
   local.get $0
   f32.add
   return
  end
  local.get $1
  i32.reinterpret_f32
  local.tee $3
  i32.const 1065353216
  i32.eq
  if
   local.get $0
   call $~lib/math/NativeMathf.atan
   return
  end
  local.get $3
  i32.const 30
  i32.shr_u
  i32.const 2
  i32.and
  local.get $0
  i32.reinterpret_f32
  local.tee $4
  i32.const 31
  i32.shr_u
  i32.or
  local.set $2
  local.get $4
  i32.const 2147483647
  i32.and
  local.tee $4
  i32.eqz
  if
   block $break|0
    block $case3|0
     block $case2|0
      block $case1|0
       local.get $2
       br_table $case1|0 $case1|0 $case2|0 $case3|0 $break|0
      end
      local.get $0
      return
     end
     f32.const 3.1415927410125732
     return
    end
    f32.const -3.1415927410125732
    return
   end
  end
  block $folding-inner0
   local.get $3
   i32.const 2147483647
   i32.and
   local.tee $3
   i32.eqz
   br_if $folding-inner0
   local.get $3
   i32.const 2139095040
   i32.eq
   if
    local.get $4
    i32.const 2139095040
    i32.eq
    if (result f32)
     f32.const 2.356194496154785
     f32.const 0.7853981852531433
     local.get $2
     i32.const 2
     i32.and
     select
    else
     f32.const 3.1415927410125732
     f32.const 0
     local.get $2
     i32.const 2
     i32.and
     select
    end
    local.tee $0
    f32.neg
    local.get $0
    local.get $2
    i32.const 1
    i32.and
    select
    return
   end
   local.get $4
   i32.const 2139095040
   i32.eq
   local.get $4
   local.get $3
   i32.const 218103808
   i32.add
   i32.gt_u
   i32.or
   br_if $folding-inner0
   local.get $3
   local.get $4
   i32.const 218103808
   i32.add
   i32.gt_u
   i32.const 0
   local.get $2
   i32.const 2
   i32.and
   select
   if (result f32)
    f32.const 0
   else
    local.get $0
    local.get $1
    f32.div
    f32.abs
    call $~lib/math/NativeMathf.atan
   end
   local.set $0
   block $break|1
    block $case3|1
     block $case2|1
      block $case1|1
       block $case0|1
        local.get $2
        br_table $case0|1 $case1|1 $case2|1 $case3|1 $break|1
       end
       local.get $0
       return
      end
      local.get $0
      f32.neg
      return
     end
     f32.const 3.1415927410125732
     local.get $0
     f32.const -8.742277657347586e-08
     f32.sub
     f32.sub
     return
    end
    local.get $0
    f32.const -8.742277657347586e-08
    f32.sub
    f32.const 3.1415927410125732
    f32.sub
    return
   end
   unreachable
  end
  f32.const -1.5707963705062866
  f32.const 1.5707963705062866
  local.get $2
  i32.const 1
  i32.and
  select
 )
 (func $~lib/typedarray/Float32Array#__get (param $0 i32) (param $1 i32) (result f32)
  local.get $0
  i32.load offset=8
  i32.const 2
  i32.shr_u
  local.get $1
  i32.le_u
  if
   i32.const 1360
   i32.const 2736
   i32.const 1294
   i32.const 64
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  f32.load
 )
 (func $~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#get (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  local.get $0
  i32.load
  local.get $0
  i32.load offset=4
  local.get $1
  local.tee $2
  i32.const -1028477379
  i32.mul
  i32.const 374761397
  i32.add
  i32.const 17
  i32.rotl
  i32.const 668265263
  i32.mul
  local.tee $0
  i32.const 15
  i32.shr_u
  local.get $0
  i32.xor
  i32.const -2048144777
  i32.mul
  local.tee $0
  i32.const 13
  i32.shr_u
  local.get $0
  i32.xor
  i32.const -1028477379
  i32.mul
  local.tee $0
  i32.const 16
  i32.shr_u
  local.get $0
  i32.xor
  i32.and
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  block $__inlined_func$~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#find
   loop $while-continue|0
    local.get $0
    if
     local.get $0
     local.tee $1
     i32.load offset=8
     local.tee $0
     i32.const 1
     i32.and
     if (result i32)
      i32.const 0
     else
      local.get $2
      local.get $1
      i32.load
      i32.eq
     end
     br_if $__inlined_func$~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#find
     local.get $0
     i32.const -2
     i32.and
     local.set $0
     br $while-continue|0
    end
   end
   i32.const 0
   local.set $1
  end
  local.get $1
  i32.eqz
  if
   i32.const 1872
   i32.const 1936
   i32.const 105
   i32.const 17
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.load offset=4
 )
 (func $~lib/array/Array<u32>#__get (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  i32.load offset=12
  local.get $1
  i32.le_u
  if
   i32.const 1360
   i32.const 1632
   i32.const 114
   i32.const 42
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  i32.load
 )
 (func $~lib/typedarray/Float32Array#__set (param $0 i32) (param $1 i32) (param $2 f32)
  local.get $0
  i32.load offset=8
  i32.const 2
  i32.shr_u
  local.get $1
  i32.le_u
  if
   i32.const 1360
   i32.const 2736
   i32.const 1305
   i32.const 64
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  local.get $2
  f32.store
 )
 (func $~lib/array/Array<f32>#push (param $0 i32) (param $1 f32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  local.get $0
  i32.load offset=12
  local.tee $2
  i32.const 1
  i32.add
  local.tee $3
  i32.const 1
  call $~lib/array/ensureCapacity
  local.get $0
  i32.load offset=4
  local.get $2
  i32.const 2
  i32.shl
  i32.add
  local.get $1
  f32.store
  local.get $0
  local.get $3
  i32.store offset=12
 )
 (func $~lib/math/NativeMathf.mod (param $0 f32) (param $1 f32) (result f32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  local.get $1
  f32.abs
  f32.const 1
  f32.eq
  if
   local.get $0
   local.get $0
   f32.trunc
   f32.sub
   local.get $0
   f32.copysign
   return
  end
  local.get $1
  i32.reinterpret_f32
  local.tee $6
  i32.const 23
  i32.shr_u
  i32.const 255
  i32.and
  local.set $7
  i32.const 1
  local.get $1
  local.get $1
  f32.ne
  local.get $0
  i32.reinterpret_f32
  local.tee $4
  i32.const 23
  i32.shr_u
  i32.const 255
  i32.and
  local.tee $8
  i32.const 255
  i32.eq
  i32.const 1
  local.get $6
  i32.const 1
  i32.shl
  local.tee $3
  select
  select
  if
   local.get $0
   local.get $1
   f32.mul
   local.tee $0
   local.get $0
   f32.div
   return
  end
  local.get $3
  local.get $4
  i32.const 1
  i32.shl
  local.tee $2
  i32.ge_u
  if
   local.get $0
   local.get $2
   local.get $3
   i32.ne
   f32.convert_i32_u
   f32.mul
   return
  end
  local.get $4
  i32.const -2147483648
  i32.and
  local.set $5
  local.get $8
  if (result i32)
   local.get $4
   i32.const 8388607
   i32.and
   i32.const 8388608
   i32.or
  else
   local.get $4
   i32.const 1
   local.get $8
   local.get $4
   i32.const 9
   i32.shl
   i32.clz
   i32.sub
   local.tee $8
   i32.sub
   i32.shl
  end
  local.set $2
  local.get $7
  if (result i32)
   local.get $6
   i32.const 8388607
   i32.and
   i32.const 8388608
   i32.or
  else
   local.get $6
   i32.const 1
   local.get $7
   local.get $6
   i32.const 9
   i32.shl
   i32.clz
   i32.sub
   local.tee $7
   i32.sub
   i32.shl
  end
  local.set $3
  loop $while-continue|0
   local.get $7
   local.get $8
   i32.lt_s
   if
    local.get $2
    local.get $3
    i32.ge_u
    if (result i32)
     local.get $2
     local.get $3
     i32.eq
     if
      local.get $0
      f32.const 0
      f32.mul
      return
     end
     local.get $2
     local.get $3
     i32.sub
    else
     local.get $2
    end
    i32.const 1
    i32.shl
    local.set $2
    local.get $8
    i32.const 1
    i32.sub
    local.set $8
    br $while-continue|0
   end
  end
  local.get $2
  local.get $3
  i32.ge_u
  if
   local.get $2
   local.get $3
   i32.eq
   if
    local.get $0
    f32.const 0
    f32.mul
    return
   end
   local.get $2
   local.get $3
   i32.sub
   local.set $2
  end
  local.get $8
  local.get $2
  i32.const 8
  i32.shl
  i32.clz
  local.tee $4
  i32.sub
  local.set $3
  local.get $2
  local.get $4
  i32.shl
  local.tee $2
  i32.const 8388608
  i32.sub
  local.get $3
  i32.const 23
  i32.shl
  i32.or
  local.get $2
  i32.const 1
  local.get $3
  i32.sub
  i32.shr_u
  local.get $3
  i32.const 0
  i32.gt_s
  select
  local.get $5
  i32.or
  f32.reinterpret_i32
 )
 (func $logic/index/updateUniverse~anonymous|0~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32)
  local.get $0
  call $logic/squad/Squad#updateCenter
 )
 (func $logic/squad/Squad#checkMembersCorrectness~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  local.get $0
  i32.load offset=40
  i32.const 0
  i32.ne
 )
 (func $~lib/math/NativeMath.hypot (param $0 f64) (param $1 f64) (result f64)
  (local $2 i64)
  (local $3 i64)
  (local $4 i64)
  (local $5 f64)
  (local $6 i32)
  (local $7 f64)
  (local $8 i32)
  (local $9 f64)
  (local $10 f64)
  (local $11 f64)
  local.get $1
  i64.reinterpret_f64
  i64.const 9223372036854775807
  i64.and
  local.tee $3
  local.get $0
  i64.reinterpret_f64
  i64.const 9223372036854775807
  i64.and
  local.tee $2
  i64.gt_u
  if
   local.get $2
   local.get $3
   local.set $2
   local.set $3
  end
  local.get $3
  f64.reinterpret_i64
  local.set $1
  local.get $3
  i64.const 52
  i64.shr_u
  i32.wrap_i64
  local.tee $6
  i32.const 2047
  i32.eq
  if
   local.get $1
   return
  end
  local.get $2
  f64.reinterpret_i64
  local.set $0
  local.get $3
  i64.eqz
  local.get $2
  i64.const 52
  i64.shr_u
  i32.wrap_i64
  local.tee $8
  i32.const 2047
  i32.eq
  i32.or
  if
   local.get $0
   return
  end
  local.get $8
  local.get $6
  i32.sub
  i32.const 64
  i32.gt_s
  if
   local.get $0
   local.get $1
   f64.add
   return
  end
  f64.const 1
  local.set $7
  local.get $8
  i32.const 1533
  i32.gt_u
  if (result f64)
   f64.const 5260135901548373507240989e186
   local.set $7
   local.get $1
   f64.const 1.90109156629516e-211
   f64.mul
   local.set $1
   local.get $0
   f64.const 1.90109156629516e-211
   f64.mul
  else
   local.get $6
   i32.const 573
   i32.lt_u
   if (result f64)
    f64.const 1.90109156629516e-211
    local.set $7
    local.get $1
    f64.const 5260135901548373507240989e186
    f64.mul
    local.set $1
    local.get $0
    f64.const 5260135901548373507240989e186
    f64.mul
   else
    local.get $0
   end
  end
  local.tee $0
  local.get $0
  local.get $0
  f64.const 134217729
  f64.mul
  local.tee $5
  f64.sub
  local.get $5
  f64.add
  local.tee $10
  f64.sub
  local.set $5
  local.get $1
  local.get $1
  local.get $1
  f64.const 134217729
  f64.mul
  local.tee $9
  f64.sub
  local.get $9
  f64.add
  local.tee $9
  f64.sub
  local.set $11
  local.get $7
  local.get $9
  local.get $9
  f64.mul
  local.get $1
  local.get $1
  f64.mul
  local.tee $1
  f64.sub
  local.get $9
  local.get $9
  f64.add
  local.get $11
  f64.add
  local.get $11
  f64.mul
  f64.add
  local.get $10
  local.get $10
  f64.mul
  local.get $0
  local.get $0
  f64.mul
  local.tee $0
  f64.sub
  local.get $10
  local.get $10
  f64.add
  local.get $5
  f64.add
  local.get $5
  f64.mul
  f64.add
  f64.add
  local.get $1
  f64.add
  local.get $0
  f64.add
  f64.sqrt
  f64.mul
 )
 (func $logic/squad/Squad#resetState~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32)
  local.get $0
  i32.const 255
  i32.store8 offset=16
  local.get $0
  i32.const 0
  i32.store offset=20
  local.get $0
  i32.load offset=40
  i32.const 3
  i32.gt_s
  if
   local.get $0
   i32.const 4
   i32.store offset=40
   local.get $0
   f32.const 0
   f32.store offset=4
   local.get $0
   f32.const 0
   f32.store offset=8
  end
 )
 (func $logic/squad/Squad#fixSquadCenter~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 f32)
  (local $4 f32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i32.const 0
  i32.store
  local.get $0
  f32.load offset=44
  local.set $3
  local.get $0
  f32.load offset=48
  local.set $4
  local.get $1
  local.get $0
  i32.load offset=56
  local.tee $2
  i32.store
  local.get $0
  i32.const 0
  local.get $3
  local.get $4
  local.get $2
  call $logic/get-initial-track-index/getInitialTrackIndex
  i32.store8 offset=16
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/array/Array<u32>#push (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  local.get $0
  i32.load offset=12
  local.tee $2
  i32.const 1
  i32.add
  local.tee $3
  i32.const 1
  call $~lib/array/ensureCapacity
  local.get $0
  i32.load offset=4
  local.get $2
  i32.const 2
  i32.shl
  i32.add
  local.get $1
  i32.store
  local.get $0
  local.get $3
  i32.store offset=12
 )
 (func $logic/unit/Unit#getAngle (param $0 i32) (param $1 f32) (param $2 f32) (result f32)
  local.get $1
  local.get $0
  f32.load offset=44
  f32.sub
  local.get $0
  f32.load offset=48
  local.get $2
  f32.sub
  call $~lib/math/NativeMathf.atan2
  f32.const 6.2831854820251465
  f32.add
  f32.const 6.2831854820251465
  call $~lib/math/NativeMathf.mod
 )
 (func $logic/unit/Unit#setDestination (param $0 i32) (param $1 i32)
  local.get $0
  i32.load offset=40
  i32.const 6
  i32.ne
  if (result i32)
   local.get $0
   i32.load offset=40
   i32.const 7
   i32.ne
  else
   i32.const 0
  end
  if
   local.get $0
   i32.const 6
   i32.store offset=40
  end
  local.get $0
  local.get $1
  i32.store offset=12
  local.get $1
  if
   local.get $0
   local.get $1
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  local.get $0
  local.get $0
  local.get $1
  f32.load
  local.get $1
  f32.load offset=4
  call $logic/unit/Unit#getAngle
  f32.store offset=52
  local.get $0
  local.get $0
  f32.load offset=52
  call $~lib/math/NativeMathf.sin
  local.get $0
  i32.load offset=56
  i32.load offset=40
  f32.load offset=12
  f32.mul
  f32.store offset=4
  local.get $0
  local.get $0
  f32.load offset=52
  call $~lib/math/NativeMathf.cos
  f32.neg
  local.get $0
  i32.load offset=56
  i32.load offset=40
  f32.load offset=12
  f32.mul
  f32.store offset=8
 )
 (func $logic/get-angle-diff/getAngleDiff (param $0 f32) (param $1 f32) (result f32)
  local.get $1
  local.get $0
  f32.sub
  f32.abs
  f32.const 6.2831854820251465
  call $~lib/math/NativeMathf.mod
  local.tee $0
  f32.const 3.1415927410125732
  f32.gt
  if
   f32.const 6.2831854820251465
   local.get $0
   f32.sub
   return
  end
  local.get $0
 )
 (func $logic/squad/Squad#setTask~anonymous|1 (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 f32)
  (local $4 f32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   i64.const 0
   i64.store
   local.get $1
   i64.const 0
   i64.store offset=8
   local.get $1
   i32.const 0
   i32.store offset=16
   local.get $0
   i32.load offset=40
   i32.const 3
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.tee $2
    local.get $0
    i32.load offset=56
    i32.load offset=20
    local.tee $5
    i32.store
    local.get $2
    local.get $0
    i32.load offset=56
    i32.load offset=24
    local.tee $1
    i32.store offset=4
    local.get $2
    local.get $0
    i32.load offset=56
    i32.load offset=28
    local.tee $2
    i32.store offset=8
    local.get $0
    i32.load8_s offset=16
    i32.const -1
    i32.ne
    if
     local.get $0
     i32.load offset=40
     i32.const 6
     i32.ne
     if (result i32)
      local.get $0
      i32.load offset=40
      i32.const 7
      i32.ne
     else
      i32.const 0
     end
     if
      local.get $0
      call $logic/unit/Unit#goToCurrentPointOnTrack
     end
     local.get $1
     i32.const 0
     local.get $0
     i32.load offset=56
     i32.load offset=44
     i32.load8_u offset=26
     select
     if
      local.get $0
      local.get $1
      i32.const 0
      i32.const 1
      call $logic/unit/Unit#changeStateToShoot
     else
      local.get $0
      i32.load offset=40
      i32.const 7
      i32.eq
      if
       local.get $0
       i32.const 6
       i32.store offset=40
       local.get $0
       i32.const 0
       i32.store offset=20
      end
     end
    else
     local.get $2
     if (result i32)
      local.get $0
      i32.load offset=40
      i32.const 3
      i32.ne
     else
      i32.const 0
     end
     if (result i32)
      local.get $0
      i32.load8_u offset=60
     else
      i32.const 1
     end
     if
      local.get $5
      if
       local.get $0
       local.get $5
       i32.const 1
       i32.const 0
       call $logic/unit/Unit#changeStateToShoot
      else
       local.get $1
       if
        local.get $0
        local.get $1
        i32.const 0
        i32.const 0
        call $logic/unit/Unit#changeStateToShoot
       else
        local.get $0
        i32.const 4
        i32.store offset=40
       end
      end
     else
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load offset=56
      i32.load offset=40
      i32.load offset=20
      local.tee $1
      i32.store offset=16
      local.get $1
      i32.eqz
      if
       i32.const 3872
       i32.const 3936
       i32.const 182
       i32.const 8
       call $~lib/builtins/abort
       unreachable
      end
      global.get $~lib/memory/__stack_pointer
      local.tee $2
      local.get $1
      i32.store offset=12
      local.get $2
      i32.const 4
      i32.sub
      global.set $~lib/memory/__stack_pointer
      global.get $~lib/memory/__stack_pointer
      i32.const 6788
      i32.lt_s
      br_if $folding-inner0
      global.get $~lib/memory/__stack_pointer
      local.tee $1
      i32.const 0
      i32.store
      local.get $1
      local.get $0
      i32.load offset=56
      i32.load offset=40
      i32.load offset=20
      local.tee $1
      i32.store
      local.get $1
      i32.eqz
      if
       i32.const 3872
       i32.const 3984
       i32.const 45
       i32.const 14
       call $~lib/builtins/abort
       unreachable
      end
      local.get $1
      i32.load
      i32.eqz
      if
       global.get $~lib/memory/__stack_pointer
       i32.const 16
       i32.sub
       global.set $~lib/memory/__stack_pointer
       global.get $~lib/memory/__stack_pointer
       i32.const 6788
       i32.lt_s
       br_if $folding-inner0
       global.get $~lib/memory/__stack_pointer
       local.tee $1
       i64.const 0
       i64.store
       local.get $1
       i64.const 0
       i64.store offset=8
       local.get $1
       local.get $0
       i32.load offset=56
       i32.load offset=28
       local.tee $1
       i32.store
       local.get $1
       if
        local.get $0
        f32.load offset=44
        local.get $1
        f32.load
        f32.sub
        local.get $0
        f32.load offset=48
        local.get $1
        f32.load offset=4
        f32.sub
        call $~lib/math/NativeMathf.hypot
        local.set $3
        local.get $1
        f32.load
        local.get $0
        f32.load offset=44
        f32.sub
        local.get $0
        f32.load offset=48
        local.get $1
        f32.load offset=4
        f32.sub
        call $~lib/math/NativeMathf.atan2
        local.set $4
        global.get $~lib/memory/__stack_pointer
        global.get $logic/weapon-details/WEAPON_DETAILS
        local.tee $2
        i32.store offset=8
        local.get $2
        i32.const 1
        call $~lib/map/Map<i32,logic/ability-details/Ability>#get
        local.set $2
        global.get $~lib/memory/__stack_pointer
        local.get $2
        i32.store offset=4
        local.get $0
        local.get $4
        local.get $2
        i32.const 0
        local.get $1
        local.get $3
        i32.const 1
        call $logic/bullets-manager/addBullet
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.load offset=56
        local.tee $1
        i32.load offset=40
        i32.load offset=20
        local.tee $2
        i32.store offset=12
        local.get $2
        i32.eqz
        if
         i32.const 3872
         i32.const 3984
         i32.const 28
         i32.const 35
         call $~lib/builtins/abort
         unreachable
        end
        local.get $1
        local.get $2
        i32.load16_u offset=4
        i32.store16 offset=4
        local.get $0
        i32.load offset=56
        i32.const 0
        i32.store offset=28
       end
       global.get $~lib/memory/__stack_pointer
       i32.const 16
       i32.add
       global.set $~lib/memory/__stack_pointer
      end
      global.get $~lib/memory/__stack_pointer
      i32.const 4
      i32.add
      global.set $~lib/memory/__stack_pointer
     end
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 20
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/index/updateUniverse~anonymous|1 (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $3
   i64.const 0
   i64.store
   local.get $3
   local.get $0
   local.tee $1
   i32.load offset=4
   local.tee $2
   i32.store
   local.get $3
   i32.const 4128
   i32.store offset=4
   local.get $3
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $0
   i64.const 0
   i64.store
   local.get $0
   i32.const 0
   i32.const 23
   i32.const 0
   call $~lib/rt/__newArray
   local.tee $4
   i32.store
   i32.const 0
   local.set $0
   local.get $2
   i32.load offset=12
   local.set $3
   loop $for-loop|0
    local.get $3
    local.get $2
    i32.load offset=12
    local.tee $5
    local.get $3
    local.get $5
    i32.lt_s
    select
    local.get $0
    i32.gt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.load offset=4
     local.get $0
     i32.const 2
     i32.shl
     i32.add
     i32.load
     local.tee $5
     i32.store offset=4
     local.get $5
     local.get $0
     local.get $2
     i32.const 4128
     i32.load
     call_indirect $0 (type $i32_i32_i32_=>_i32)
     if
      local.get $4
      local.get $5
      call $~lib/array/Array<logic/geom-types/Point>#push
     end
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $1
   local.get $4
   i32.store offset=4
   local.get $4
   if
    local.get $1
    local.get $4
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/squads-grid-manager/fillGrid~anonymous|0~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32)
  local.get $0
  call $logic/squads-grid-manager/addSquadToGrid
 )
 (func $logic/search-for-enemy/searchForEnemy~anonymous|0~anonymous|0~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  local.get $0
  i32.load offset=40
  i32.const 6
  i32.eq
  if (result i32)
   i32.const 1
  else
   local.get $0
   i32.load offset=40
   i32.const 7
   i32.eq
  end
 )
 (func $~lib/math/NativeMathf.log (param $0 f32) (result f32)
  (local $1 i32)
  (local $2 f64)
  (local $3 i32)
  (local $4 i32)
  (local $5 f64)
  block $~lib/util/math/logf_lut|inlined.0 (result f32)
   local.get $0
   i32.reinterpret_f32
   local.tee $1
   i32.const 8388608
   i32.sub
   i32.const 2130706432
   i32.ge_u
   if
    f32.const -inf
    local.get $1
    i32.const 1
    i32.shl
    i32.eqz
    br_if $~lib/util/math/logf_lut|inlined.0
    drop
    local.get $0
    local.get $1
    i32.const 2139095040
    i32.eq
    br_if $~lib/util/math/logf_lut|inlined.0
    drop
    local.get $1
    i32.const 31
    i32.shr_u
    local.get $1
    i32.const 1
    i32.shl
    i32.const -16777216
    i32.ge_u
    i32.or
    if
     local.get $0
     local.get $0
     f32.sub
     local.tee $0
     local.get $0
     f32.div
     br $~lib/util/math/logf_lut|inlined.0
    end
    local.get $0
    f32.const 8388608
    f32.mul
    i32.reinterpret_f32
    i32.const 192937984
    i32.sub
    local.set $1
   end
   local.get $1
   i32.const 1060306944
   i32.sub
   local.tee $3
   i32.const 19
   i32.shr_u
   i32.const 15
   i32.and
   i32.const 4
   i32.shl
   i32.const 4592
   i32.add
   local.set $4
   local.get $1
   local.get $3
   i32.const -8388608
   i32.and
   i32.sub
   f32.reinterpret_i32
   f64.promote_f32
   local.get $4
   f64.load
   f64.mul
   f64.const 1
   f64.sub
   local.tee $2
   local.get $2
   f64.mul
   local.set $5
   local.get $2
   f64.const 0.333456765744066
   f64.mul
   f64.const -0.4999997485802103
   f64.add
   local.get $5
   f64.const -0.25089342214237154
   f64.mul
   f64.add
   local.get $5
   f64.mul
   local.get $4
   f64.load offset=8
   local.get $3
   i32.const 23
   i32.shr_s
   f64.convert_i32_s
   f64.const 0.6931471805599453
   f64.mul
   f64.add
   local.get $2
   f64.add
   f64.add
   f32.demote_f64
  end
 )
 (func $logic/unit/Unit#changeStateToFly (param $0 i32) (param $1 f32) (param $2 f32)
  (local $3 f32)
  (local $4 i32)
  (local $5 f32)
  (local $6 i32)
  (local $7 f32)
  (local $8 f32)
  (local $9 f32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   local.get $0
   i32.const 1
   i32.store offset=40
   local.get $0
   local.get $1
   f32.const 3.1415927410125732
   f32.add
   f32.const 6.2831854820251465
   call $~lib/math/NativeMathf.mod
   f32.store offset=52
   global.get $~lib/memory/__stack_pointer
   local.get $0
   f32.load offset=44
   local.set $7
   local.get $0
   f32.load offset=48
   local.set $8
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   block $__inlined_func$logic/get-fly-modes/getFlyModes
    f32.const 0.03500000014901161
    local.get $2
    f32.div
    call $~lib/math/NativeMathf.log
    f32.const 0.9700000286102295
    call $~lib/math/NativeMathf.log
    f32.div
    f32.ceil
    local.tee $3
    f32.const 1.1920928955078125e-07
    f32.le
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 0
     call $logic/geom-types/Point#constructor
     local.tee $4
     i32.store
     local.get $4
     f32.const 0
     f32.store
     local.get $4
     f32.const 0
     f32.store offset=4
     br $__inlined_func$logic/get-fly-modes/getFlyModes
    end
    f32.const 0.9700000286102295
    local.set $5
    local.get $3
    f32.const 1
    f32.sub
    local.set $3
    loop $while-continue|0
     local.get $3
     f32.const 0
     f32.gt
     if
      local.get $5
      f32.const 0.9700000286102295
      f32.mul
      local.set $5
      local.get $3
      f32.const 1
      f32.sub
      local.set $3
      br $while-continue|0
     end
    end
    local.get $2
    f32.const 1
    local.get $5
    f32.sub
    f32.mul
    f32.const 0.029999971389770508
    f32.div
    local.tee $5
    local.tee $3
    f32.const 5
    f32.div
    local.set $9
    loop $while-continue|1
     local.get $3
     f32.const 0.009999999776482582
     f32.gt
     if
      local.get $1
      call $~lib/math/NativeMathf.sin
      local.get $3
      f32.mul
      local.get $7
      f32.add
      local.get $1
      call $~lib/math/NativeMathf.cos
      f32.neg
      local.get $3
      f32.mul
      local.get $8
      f32.add
      i32.const 0
      call $logic/obstacles-manager/getIsPointAvailable
      i32.eqz
      if
       local.get $3
       local.get $9
       f32.sub
       local.set $3
       br $while-continue|1
      end
     end
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 0
    call $logic/geom-types/Point#constructor
    local.tee $4
    i32.store offset=4
    local.get $4
    local.get $1
    call $~lib/math/NativeMathf.sin
    local.get $2
    f32.mul
    local.get $3
    local.get $5
    f32.div
    local.tee $3
    f32.mul
    f32.store
    local.get $4
    local.get $1
    call $~lib/math/NativeMathf.cos
    f32.neg
    local.get $2
    f32.mul
    local.get $3
    f32.mul
    f32.store offset=4
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $4
   i32.store
   local.get $0
   local.get $4
   f32.load
   f32.store offset=4
   local.get $0
   local.get $4
   f32.load offset=4
   f32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/unit/Unit#updateShoot (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 f32)
  (local $4 f32)
  (local $5 f32)
  (local $6 i32)
  (local $7 f32)
  (local $8 f32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  local.get $0
  i32.load16_u offset=18
  if
   local.get $0
   local.get $0
   i32.load16_u offset=18
   i32.const 1
   i32.sub
   i32.store16 offset=18
  else
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load offset=56
   i32.load offset=44
   local.tee $2
   i32.store
   call $logic/get-random/getRandom
   f32.const 0.5
   f32.sub
   local.set $3
   call $logic/get-random/getRandom
   f32.const 0.5
   f32.sub
   local.set $4
   local.get $0
   i32.load offset=40
   i32.const 5
   i32.eq
   if (result f32)
    local.get $0
    f32.load offset=52
   else
    local.get $0
    f32.load offset=32
   end
   local.set $5
   global.get $~lib/memory/__stack_pointer
   local.tee $6
   local.get $0
   i32.load offset=20
   local.tee $1
   i32.store offset=4
   local.get $1
   i32.eqz
   if
    i32.const 3872
    i32.const 3936
    i32.const 287
    i32.const 25
    call $~lib/builtins/abort
    unreachable
   end
   local.get $6
   local.get $1
   i32.store offset=4
   local.get $1
   i32.load offset=56
   i32.load offset=40
   f32.load offset=16
   local.set $7
   local.get $0
   f32.load offset=44
   local.get $1
   f32.load offset=44
   f32.sub
   local.get $0
   f32.load offset=48
   local.get $1
   f32.load offset=48
   f32.sub
   call $~lib/math/NativeMathf.hypot
   local.get $4
   f32.const 0.25
   f32.mul
   f32.const 1
   f32.add
   f32.mul
   local.set $8
   local.get $0
   local.get $5
   local.get $2
   f32.load offset=8
   f32.const 2
   f32.mul
   local.get $3
   f32.mul
   f32.add
   local.get $2
   local.get $1
   i32.const 0
   local.get $8
   local.get $7
   f32.const 100
   f32.div
   f64.promote_f32
   local.get $3
   f64.promote_f32
   f64.abs
   local.get $4
   f64.promote_f32
   f64.abs
   f64.add
   f64.gt
   call $logic/bullets-manager/addBullet
   local.get $0
   call $logic/get-random/getRandom
   local.get $2
   f32.load offset=12
   f32.lt
   if (result i32)
    local.get $2
    i32.load16_u offset=16
   else
    local.get $2
    i32.load16_u offset=18
   end
   i32.store16 offset=18
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/squad/Squad#update~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 f32)
  (local $4 f32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   block $break|0
    block $case5|0
     block $case4|0
      block $case2|0
       block $case1|0
        block $case0|0
         local.get $0
         i32.load offset=40
         i32.const 1
         i32.sub
         br_table $case0|0 $case1|0 $case5|0 $break|0 $case4|0 $case2|0 $case2|0 $break|0
        end
        local.get $0
        local.get $0
        f32.load offset=44
        local.get $0
        f32.load offset=4
        f32.add
        f32.store offset=44
        local.get $0
        local.get $0
        f32.load offset=48
        local.get $0
        f32.load offset=8
        f32.add
        f32.store offset=48
        local.get $0
        local.get $0
        f32.load offset=4
        f32.const 0.9700000286102295
        f32.mul
        f32.store offset=4
        local.get $0
        local.get $0
        f32.load offset=8
        f32.const 0.9700000286102295
        f32.mul
        f32.store offset=8
        local.get $0
        f32.load offset=4
        f64.promote_f32
        local.get $0
        f32.load offset=8
        f64.promote_f32
        call $~lib/math/NativeMath.hypot
        f64.const 0.03500000014901161
        f64.le
        if
         local.get $0
         i32.load16_s offset=24
         i32.const 0
         i32.le_s
         if
          local.get $0
          i32.const 0
          i32.store offset=40
          local.get $0
          f32.const 0
          f32.store offset=4
          local.get $0
          f32.const 0
          f32.store offset=8
         else
          local.get $0
          i32.const 2
          i32.store offset=40
          local.get $0
          f32.const 0
          f32.store offset=28
         end
        end
        br $break|0
       end
       global.get $~lib/memory/__stack_pointer
       i32.const 4
       i32.sub
       global.set $~lib/memory/__stack_pointer
       global.get $~lib/memory/__stack_pointer
       i32.const 6788
       i32.lt_s
       br_if $folding-inner0
       global.get $~lib/memory/__stack_pointer
       i32.const 0
       i32.store
       local.get $0
       local.get $0
       f32.load offset=28
       f32.const 0.009999999776482582
       f32.add
       f32.store offset=28
       local.get $0
       f32.load offset=28
       f32.const 1
       f32.ge
       if
        local.get $0
        i32.const 4
        i32.store offset=40
        local.get $0
        i32.load8_s offset=16
        i32.const -1
        i32.ne
        if
         f64.const 0
         local.get $0
         i32.load8_s offset=16
         i32.const 1
         i32.sub
         f64.convert_i32_s
         f64.max
         i32.trunc_f64_s
         local.set $2
         local.get $0
         f32.load offset=44
         local.set $3
         local.get $0
         f32.load offset=48
         local.set $4
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.load offset=56
         local.tee $1
         i32.store
         local.get $0
         local.get $2
         local.get $3
         local.get $4
         local.get $1
         call $logic/get-initial-track-index/getInitialTrackIndex
         i32.store8 offset=16
        end
       end
       global.get $~lib/memory/__stack_pointer
       i32.const 4
       i32.add
       global.set $~lib/memory/__stack_pointer
       br $break|0
      end
      global.get $~lib/memory/__stack_pointer
      i32.const 4
      i32.sub
      global.set $~lib/memory/__stack_pointer
      global.get $~lib/memory/__stack_pointer
      i32.const 6788
      i32.lt_s
      br_if $folding-inner0
      global.get $~lib/memory/__stack_pointer
      i32.const 0
      i32.store
      local.get $0
      f32.load offset=44
      local.get $0
      i32.load offset=12
      local.tee $1
      f32.load
      f32.sub
      f64.promote_f32
      local.get $0
      f32.load offset=48
      local.get $1
      f32.load offset=4
      f32.sub
      f64.promote_f32
      call $~lib/math/NativeMath.hypot
      local.get $0
      i32.load offset=56
      i32.load offset=40
      f32.load offset=12
      f64.promote_f32
      f64.lt
      if
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.load offset=56
       i32.load offset=32
       local.tee $1
       i32.store
       local.get $0
       i32.load8_s offset=16
       local.get $1
       i32.load offset=12
       i32.const 1
       i32.sub
       i32.eq
       if
        local.get $0
        i32.const 255
        i32.store8 offset=16
        local.get $0
        i32.const 0
        i32.store offset=20
        local.get $0
        i32.load offset=40
        i32.const 3
        i32.gt_s
        if
         local.get $0
         i32.const 4
         i32.store offset=40
         local.get $0
         f32.const 0
         f32.store offset=4
         local.get $0
         f32.const 0
         f32.store offset=8
        end
       else
        local.get $0
        local.get $0
        i32.load8_s offset=16
        i32.const 1
        i32.add
        i32.store8 offset=16
        local.get $0
        call $logic/unit/Unit#goToCurrentPointOnTrack
       end
      else
       local.get $0
       local.get $0
       f32.load offset=44
       local.get $0
       f32.load offset=4
       f32.add
       f32.store offset=44
       local.get $0
       local.get $0
       f32.load offset=48
       local.get $0
       f32.load offset=8
       f32.add
       f32.store offset=48
       local.get $0
       i32.load offset=56
       i32.load offset=44
       i32.load8_u offset=26
       if (result i32)
        local.get $0
        i32.load offset=20
       else
        i32.const 0
       end
       if
        local.get $0
        i32.const 7
        i32.store offset=40
        local.get $0
        call $logic/unit/Unit#updateShoot
       end
      end
      global.get $~lib/memory/__stack_pointer
      i32.const 4
      i32.add
      global.set $~lib/memory/__stack_pointer
      br $break|0
     end
     local.get $0
     call $logic/unit/Unit#updateShoot
     br $break|0
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=56
    i32.load offset=40
    i32.load offset=20
    local.tee $0
    i32.store offset=4
    local.get $0
    i32.eqz
    if
     i32.const 3872
     i32.const 3936
     i32.const 327
     i32.const 10
     call $~lib/builtins/abort
     unreachable
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/faction/Faction#update~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32)
  local.get $0
  call $logic/squad/Squad#update
 )
 (func $logic/index/updateUniverse~anonymous|2 (param $0 i32) (param $1 i32) (param $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i64.const 0
  i64.store
  local.get $2
  i32.const 0
  i32.store offset=8
  local.get $2
  local.get $0
  i32.load offset=4
  local.tee $1
  i32.store
  local.get $2
  i32.const 4944
  i32.store offset=4
  local.get $1
  i32.const 4944
  call $~lib/array/Array<logic/squad/Squad>#forEach
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  call $logic/factory/Factory#update
  local.tee $1
  i32.store offset=8
  local.get $1
  if
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load offset=4
   local.tee $0
   i32.store
   local.get $0
   local.get $1
   call $~lib/array/Array<logic/geom-types/Point>#push
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/squad/Squad#getRepresentation~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 f32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $1
  local.get $0
  f32.load offset=44
  local.get $0
  f32.load offset=48
  call $logic/convert-coords-between-logic-and-visual/convertLogicCoordsToVisual
  local.tee $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 7
  i32.const 46
  i32.const 0
  call $~lib/rt/__newArray
  local.tee $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.load offset=4
  i32.store offset=8
  local.get $1
  i32.load offset=4
  local.get $0
  i32.load offset=56
  i32.load offset=40
  f32.load
  f32.store
  local.get $1
  i32.load offset=4
  local.get $0
  f32.load
  f32.store offset=4
  local.get $1
  i32.load offset=4
  local.get $2
  f32.load
  f32.store offset=8
  local.get $1
  i32.load offset=4
  local.get $2
  f32.load offset=4
  f32.store offset=12
  local.get $1
  i32.load offset=4
  local.get $0
  f32.load offset=52
  f32.const -0.6499999761581421
  f32.add
  f32.store offset=16
  local.get $1
  i32.load offset=4
  local.get $0
  i32.load offset=40
  f32.convert_i32_s
  f32.store offset=20
  block $__inlined_func$logic/unit/Unit#getAdditionalRepresentationParam (result f32)
   block $case5|0
    block $case4|0
     block $case3|0
      block $case2|0
       block $case1|0
        block $case0|0
         local.get $0
         i32.load offset=40
         i32.const 1
         i32.sub
         br_table $case0|0 $case1|0 $case3|0 $case5|0 $case2|0 $case5|0 $case4|0 $case5|0
        end
        local.get $0
        f32.load offset=4
        local.get $0
        f32.load offset=8
        call $~lib/math/NativeMathf.hypot
        br $__inlined_func$logic/unit/Unit#getAdditionalRepresentationParam
       end
       local.get $0
       f32.load offset=28
       br $__inlined_func$logic/unit/Unit#getAdditionalRepresentationParam
      end
      local.get $0
      i32.load16_u offset=18
      f32.convert_i32_u
      br $__inlined_func$logic/unit/Unit#getAdditionalRepresentationParam
     end
     f32.const 0
     br $__inlined_func$logic/unit/Unit#getAdditionalRepresentationParam
    end
    local.get $0
    i32.load offset=20
    if (result f32)
     local.get $0
     i32.load16_u offset=18
     f32.convert_i32_u
    else
     f32.const 0
    end
    br $__inlined_func$logic/unit/Unit#getAdditionalRepresentationParam
   end
   f32.const 0
  end
  local.set $3
  local.get $1
  i32.load offset=4
  local.get $3
  f32.store offset=24
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $logic/faction/Faction#getRepresentation~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  local.get $0
  call $logic/squad/Squad#getRepresentation
 )
 (func $logic/index/getUniverseRepresentation~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 f32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 28
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   i64.const 0
   i64.store
   local.get $1
   i64.const 0
   i64.store offset=8
   local.get $1
   i64.const 0
   i64.store offset=16
   local.get $1
   i32.const 0
   i32.store offset=24
   local.get $1
   i32.const 2
   i32.const 46
   i32.const 0
   call $~lib/rt/__newArray
   local.tee $5
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.load offset=4
   i32.store offset=4
   local.get $5
   i32.load offset=4
   f32.const 0
   f32.store
   local.get $5
   i32.load offset=4
   local.get $0
   i32.load offset=16
   f32.convert_i32_s
   f32.store offset=4
   local.get $1
   local.get $5
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load offset=8
   i32.load offset=16
   local.tee $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $4
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   block $__inlined_func$logic/factory/Factory#getRepresentation (result i32)
    local.get $1
    i32.load offset=12
    i32.const 0
    i32.gt_s
    if (result i32)
     local.get $1
     i32.load offset=4
     i32.load
     i32.load16_s offset=24
    else
     i32.const 0
    end
    local.set $2
    global.get $~lib/memory/__stack_pointer
    i32.const 16
    i32.sub
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    i32.const 6788
    i32.lt_s
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    local.tee $1
    i64.const 0
    i64.store
    local.get $1
    i64.const 0
    i64.store offset=8
    local.get $1
    local.get $4
    i32.load
    local.tee $1
    i32.store
    local.get $1
    i32.load offset=12
    i32.const 0
    i32.gt_s
    if (result f32)
     local.get $4
     i32.load16_u offset=4
     f32.convert_i32_u
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.load
     local.tee $1
     i32.store
     local.get $1
     i32.load offset=4
     i32.load
     f32.load
     f32.div
    else
     f32.const 0
    end
    local.set $3
    global.get $~lib/memory/__stack_pointer
    local.tee $6
    i32.const 4
    i32.const 46
    i32.const 0
    call $~lib/rt/__newArray
    local.tee $1
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.load offset=4
    i32.store offset=8
    local.get $1
    i32.load offset=4
    i32.const 3
    i32.const 1
    local.get $4
    i32.load8_u offset=36
    select
    f32.convert_i32_s
    f32.store
    local.get $1
    i32.load offset=4
    local.get $4
    f32.load offset=16
    f32.store offset=4
    local.get $1
    i32.load offset=4
    local.get $2
    f32.convert_i32_s
    f32.store offset=8
    local.get $1
    i32.load offset=4
    local.get $3
    f32.store offset=12
    local.get $6
    local.get $1
    i32.store offset=8
    local.get $4
    i32.load8_u offset=36
    if
     i32.const 0
     local.set $2
     loop $for-loop|0
      local.get $2
      i32.const 5
      i32.lt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.get $4
       i32.load
       local.tee $6
       i32.store
       local.get $6
       i32.load offset=12
       i32.const 1
       i32.sub
       local.get $2
       i32.gt_s
       if
        global.get $~lib/memory/__stack_pointer
        local.get $4
        i32.load
        local.tee $6
        i32.store
        local.get $1
        local.get $6
        i32.load offset=4
        local.get $2
        i32.const 2
        i32.shl
        i32.add
        i32.load
        i32.load offset=4
        f32.convert_i32_s
        call $~lib/array/Array<f32>#push
       else
        local.get $1
        f32.const 0
        call $~lib/array/Array<f32>#push
       end
       local.get $2
       i32.const 1
       i32.add
       local.set $2
       br $for-loop|0
      end
     end
    end
    global.get $~lib/memory/__stack_pointer
    local.get $4
    i32.load offset=8
    local.tee $2
    i32.store offset=4
    local.get $2
    if
     local.get $2
     call $logic/squad/Squad#getRepresentation
     local.set $2
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=12
     local.get $1
     local.get $2
     call $~lib/array/Array<f32>#concat
     global.get $~lib/memory/__stack_pointer
     i32.const 16
     i32.add
     global.set $~lib/memory/__stack_pointer
     br $__inlined_func$logic/factory/Factory#getRepresentation
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 16
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $1
   end
   local.tee $1
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   local.tee $2
   local.get $0
   i32.load offset=4
   local.tee $0
   i32.store offset=16
   local.get $2
   i32.const 5040
   i32.store offset=20
   local.get $0
   i32.const 5040
   call $~lib/array/Array<logic/geom-types/Line>#map<~lib/array/Array<f32>>
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=8
   local.get $2
   local.get $0
   call $~lib/array/Array<~lib/array/Array<f32>>#flat
   local.tee $0
   i32.store offset=24
   local.get $5
   local.get $1
   call $~lib/array/Array<f32>#concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   local.get $1
   local.get $0
   call $~lib/array/Array<f32>#concat
   global.get $~lib/memory/__stack_pointer
   i32.const 28
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/hex-positions/getPositions~anonymous|0 (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  f32.load offset=4
  local.get $1
  f32.load offset=4
  f32.sub
  i32.trunc_f32_s
 )
 (func $~lib/util/sort/insertionSort<logic/geom-types/Point> (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  local.get $3
  local.get $2
  local.get $1
  i32.sub
  i32.const 1
  i32.add
  local.tee $5
  local.get $3
  i32.sub
  i32.const 1
  i32.and
  i32.sub
  local.get $5
  i32.const 1
  i32.and
  local.get $3
  select
  local.get $1
  i32.add
  local.set $7
  loop $for-loop|0
   local.get $2
   local.get $7
   i32.ge_s
   if
    global.get $~lib/memory/__stack_pointer
    local.tee $3
    local.get $7
    i32.const 2
    i32.shl
    local.get $0
    i32.add
    local.tee $5
    i32.load
    local.tee $6
    i32.store
    local.get $3
    local.get $5
    i32.load offset=4
    local.tee $5
    i32.store offset=4
    local.get $6
    local.set $3
    local.get $6
    local.get $5
    local.get $4
    i32.load
    call_indirect $0 (type $i32_i32_=>_i32)
    i32.const 0
    i32.le_s
    if
     local.get $5
     local.set $3
     local.get $6
     local.set $5
    end
    local.get $7
    i32.const 1
    i32.sub
    local.set $6
    loop $while-continue|1
     local.get $1
     local.get $6
     i32.le_s
     if
      block $while-break|1
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.const 2
       i32.shl
       local.get $0
       i32.add
       i32.load
       local.tee $8
       i32.store
       local.get $8
       local.get $3
       local.get $4
       i32.load
       call_indirect $0 (type $i32_i32_=>_i32)
       i32.const 0
       i32.le_s
       br_if $while-break|1
       local.get $6
       i32.const 2
       i32.shl
       local.get $0
       i32.add
       local.get $8
       i32.store offset=8
       local.get $6
       i32.const 1
       i32.sub
       local.set $6
       br $while-continue|1
      end
     end
    end
    local.get $6
    i32.const 2
    i32.shl
    local.get $0
    i32.add
    local.get $3
    i32.store offset=8
    loop $while-continue|2
     local.get $1
     local.get $6
     i32.le_s
     if
      block $while-break|2
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.const 2
       i32.shl
       local.get $0
       i32.add
       i32.load
       local.tee $3
       i32.store
       local.get $3
       local.get $5
       local.get $4
       i32.load
       call_indirect $0 (type $i32_i32_=>_i32)
       i32.const 0
       i32.le_s
       br_if $while-break|2
       local.get $6
       i32.const 2
       i32.shl
       local.get $0
       i32.add
       local.get $3
       i32.store offset=4
       local.get $6
       i32.const 1
       i32.sub
       local.set $6
       br $while-continue|2
      end
     end
    end
    local.get $6
    i32.const 2
    i32.shl
    local.get $0
    i32.add
    local.get $5
    i32.store offset=4
    local.get $7
    i32.const 2
    i32.add
    local.set $7
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/util/sort/mergeRuns<logic/geom-types/Point> (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  local.get $2
  i32.const 1
  i32.sub
  local.tee $2
  local.get $3
  i32.add
  local.set $7
  local.get $2
  i32.const 1
  i32.add
  local.set $6
  loop $for-loop|0
   local.get $1
   local.get $6
   i32.lt_s
   if
    local.get $4
    local.get $6
    i32.const 1
    i32.sub
    local.tee $6
    i32.const 2
    i32.shl
    local.tee $8
    i32.add
    local.get $0
    local.get $8
    i32.add
    i32.load
    i32.store
    br $for-loop|0
   end
  end
  loop $for-loop|1
   local.get $2
   local.get $3
   i32.lt_s
   if
    local.get $7
    local.get $2
    i32.sub
    i32.const 2
    i32.shl
    local.get $4
    i32.add
    local.get $2
    i32.const 2
    i32.shl
    local.get $0
    i32.add
    i32.load offset=4
    i32.store
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|1
   end
  end
  loop $for-loop|2
   local.get $1
   local.get $3
   i32.le_s
   if
    global.get $~lib/memory/__stack_pointer
    local.tee $7
    local.get $2
    i32.const 2
    i32.shl
    local.get $4
    i32.add
    i32.load
    local.tee $8
    i32.store
    local.get $7
    local.get $6
    i32.const 2
    i32.shl
    local.get $4
    i32.add
    i32.load
    local.tee $7
    i32.store offset=4
    local.get $8
    local.get $7
    local.get $5
    i32.load
    call_indirect $0 (type $i32_i32_=>_i32)
    i32.const 0
    i32.lt_s
    if
     local.get $1
     i32.const 2
     i32.shl
     local.get $0
     i32.add
     local.get $8
     i32.store
     local.get $2
     i32.const 1
     i32.sub
     local.set $2
    else
     local.get $1
     i32.const 2
     i32.shl
     local.get $0
     i32.add
     local.get $7
     i32.store
     local.get $6
     i32.const 1
     i32.add
     local.set $6
    end
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|2
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/util/sort/SORT<logic/geom-types/Point> (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i64)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $5
  i64.const 0
  i64.store
  local.get $5
  i32.const 0
  i32.store offset=8
  block $folding-inner0
   local.get $1
   i32.const 48
   i32.le_s
   if
    local.get $1
    i32.const 1
    i32.le_s
    br_if $folding-inner0
    block $break|0
     block $case1|0
      local.get $1
      i32.const 3
      i32.ne
      if
       local.get $1
       i32.const 2
       i32.eq
       br_if $case1|0
       br $break|0
      end
      global.get $~lib/memory/__stack_pointer
      local.tee $1
      local.get $0
      i32.load
      local.tee $3
      i32.store
      local.get $1
      local.get $0
      i32.load offset=4
      local.tee $1
      i32.store offset=4
      local.get $0
      local.get $1
      local.get $3
      local.get $3
      local.get $1
      local.get $2
      i32.load
      call_indirect $0 (type $i32_i32_=>_i32)
      i32.const 0
      i32.gt_s
      local.tee $4
      select
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $3
      local.get $1
      local.get $4
      select
      local.tee $1
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load offset=8
      local.tee $3
      i32.store offset=4
      local.get $0
      local.get $3
      local.get $1
      local.get $1
      local.get $3
      local.get $2
      i32.load
      call_indirect $0 (type $i32_i32_=>_i32)
      i32.const 0
      i32.gt_s
      local.tee $4
      select
      i32.store offset=4
      local.get $0
      local.get $1
      local.get $3
      local.get $4
      select
      i32.store offset=8
     end
     global.get $~lib/memory/__stack_pointer
     local.tee $1
     local.get $0
     i32.load
     local.tee $3
     i32.store offset=8
     local.get $1
     local.get $0
     i32.load offset=4
     local.tee $1
     i32.store offset=4
     local.get $0
     local.get $1
     local.get $3
     local.get $3
     local.get $1
     local.get $2
     i32.load
     call_indirect $0 (type $i32_i32_=>_i32)
     i32.const 0
     i32.gt_s
     local.tee $2
     select
     i32.store
     local.get $0
     local.get $3
     local.get $1
     local.get $2
     select
     i32.store offset=4
     br $folding-inner0
    end
    local.get $0
    i32.const 0
    local.get $1
    i32.const 1
    i32.sub
    i32.const 0
    local.get $2
    call $~lib/util/sort/insertionSort<logic/geom-types/Point>
    br $folding-inner0
   end
   i32.const 33
   local.get $1
   i32.clz
   i32.sub
   local.tee $5
   i32.const 2
   i32.shl
   local.tee $6
   i32.const 1
   i32.shl
   local.set $7
   global.get $~lib/rt/tlsf/ROOT
   i32.eqz
   if
    call $~lib/rt/tlsf/initialize
   end
   global.get $~lib/rt/tlsf/ROOT
   local.get $7
   call $~lib/rt/tlsf/allocateBlock
   i32.const 4
   i32.add
   local.tee $10
   local.get $6
   i32.add
   local.set $11
   loop $for-loop|1
    local.get $4
    local.get $5
    i32.lt_u
    if
     local.get $4
     i32.const 2
     i32.shl
     local.get $10
     i32.add
     i32.const -1
     i32.store
     local.get $4
     i32.const 1
     i32.add
     local.set $4
     br $for-loop|1
    end
   end
   global.get $~lib/rt/tlsf/ROOT
   i32.eqz
   if
    call $~lib/rt/tlsf/initialize
   end
   global.get $~lib/rt/tlsf/ROOT
   local.get $1
   i32.const 2
   i32.shl
   call $~lib/rt/tlsf/allocateBlock
   i32.const 4
   i32.add
   local.set $12
   local.get $0
   i32.const 0
   local.get $1
   i32.const 1
   i32.sub
   local.tee $9
   local.get $2
   call $~lib/util/sort/extendRunRight<logic/geom-types/Point>
   local.tee $4
   i32.const 1
   i32.add
   local.tee $1
   i32.const 32
   i32.lt_s
   if
    local.get $0
    i32.const 0
    local.get $9
    i32.const 31
    local.get $9
    i32.const 31
    i32.lt_s
    select
    local.tee $4
    local.get $1
    local.get $2
    call $~lib/util/sort/insertionSort<logic/geom-types/Point>
   end
   i32.const 0
   local.set $1
   loop $while-continue|2
    local.get $4
    local.get $9
    i32.lt_s
    if
     local.get $0
     local.get $4
     i32.const 1
     i32.add
     local.tee $6
     local.get $9
     local.get $2
     call $~lib/util/sort/extendRunRight<logic/geom-types/Point>
     local.tee $5
     local.get $6
     i32.sub
     i32.const 1
     i32.add
     local.tee $7
     i32.const 32
     i32.lt_s
     if
      local.get $0
      local.get $6
      local.get $9
      local.get $6
      i32.const 31
      i32.add
      local.tee $5
      local.get $5
      local.get $9
      i32.gt_s
      select
      local.tee $5
      local.get $7
      local.get $2
      call $~lib/util/sort/insertionSort<logic/geom-types/Point>
     end
     local.get $3
     local.get $6
     i32.add
     i64.extend_i32_u
     i64.const 30
     i64.shl
     local.get $9
     i32.const 1
     i32.add
     i64.extend_i32_u
     local.tee $13
     i64.div_u
     local.get $5
     local.get $6
     i32.add
     i32.const 1
     i32.add
     i64.extend_i32_u
     i64.const 30
     i64.shl
     local.get $13
     i64.div_u
     i64.xor
     i32.wrap_i64
     i32.clz
     local.set $7
     loop $for-loop|3
      local.get $1
      local.get $7
      i32.gt_u
      if
       local.get $1
       i32.const 2
       i32.shl
       local.get $10
       i32.add
       i32.load
       local.tee $8
       i32.const -1
       i32.ne
       if
        local.get $0
        local.get $8
        local.get $11
        local.get $1
        i32.const 2
        i32.shl
        local.tee $3
        i32.add
        i32.load
        i32.const 1
        i32.add
        local.get $4
        local.get $12
        local.get $2
        call $~lib/util/sort/mergeRuns<logic/geom-types/Point>
        local.get $3
        local.get $10
        i32.add
        i32.const -1
        i32.store
        local.get $8
        local.set $3
       end
       local.get $1
       i32.const 1
       i32.sub
       local.set $1
       br $for-loop|3
      end
     end
     local.get $10
     local.get $7
     i32.const 2
     i32.shl
     local.tee $1
     i32.add
     local.get $3
     i32.store
     local.get $1
     local.get $11
     i32.add
     local.get $4
     i32.store
     local.get $6
     local.set $3
     local.get $5
     local.set $4
     local.get $7
     local.set $1
     br $while-continue|2
    end
   end
   loop $for-loop|4
    local.get $1
    if
     local.get $1
     i32.const 2
     i32.shl
     local.get $10
     i32.add
     i32.load
     local.tee $3
     i32.const -1
     i32.ne
     if
      local.get $0
      local.get $3
      local.get $1
      i32.const 2
      i32.shl
      local.get $11
      i32.add
      i32.load
      i32.const 1
      i32.add
      local.get $9
      local.get $12
      local.get $2
      call $~lib/util/sort/mergeRuns<logic/geom-types/Point>
     end
     local.get $1
     i32.const 1
     i32.sub
     local.set $1
     br $for-loop|4
    end
   end
   local.get $12
   call $~lib/rt/tlsf/__free
   local.get $10
   call $~lib/rt/tlsf/__free
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/hex-positions/setAggressorPositions~anonymous|0 (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  i32.load offset=36
  f32.load offset=4
  local.get $1
  i32.load offset=36
  f32.load offset=4
  f32.sub
  i32.trunc_f32_s
 )
 (func $logic/index/moveUnits~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (result f32)
  local.get $0
  f32.load
 )
 (func $logic/index/getSelectedUnitsIds~anonymous|1 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  local.get $0
  i32.load
 )
 (func $logic/index/getSelectedUnitsIds~anonymous|2~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  local.get $0
  f32.load
  i32.trunc_f32_u
 )
 (func $logic/squads-grid-manager/pickCellIndexesInPolygonDebug~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 f32)
  local.get $0
  global.get $logic/squads-grid-manager/gridMapWidth
  local.tee $1
  i32.rem_s
  f32.convert_i32_s
  global.get $logic/squads-grid-manager/gridMapScaleX
  local.tee $3
  f32.div
  f32.const 1
  local.get $3
  local.get $3
  f32.add
  f32.div
  f32.add
  local.get $0
  f32.convert_i32_s
  local.get $1
  f32.convert_i32_s
  f32.div
  f32.floor
  global.get $logic/squads-grid-manager/gridMapScaleY
  local.tee $3
  f32.div
  f32.const 1
  local.get $3
  local.get $3
  f32.add
  f32.div
  f32.add
  call $logic/convert-coords-between-logic-and-visual/convertLogicCoordsToVisual
 )
 (func $~lib/rt/itcms/__pin (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  if
   local.get $0
   i32.const 20
   i32.sub
   local.tee $1
   i32.load offset=4
   i32.const 3
   i32.and
   i32.const 3
   i32.eq
   if
    i32.const 6064
    i32.const 1232
    i32.const 337
    i32.const 7
    call $~lib/builtins/abort
    unreachable
   end
   local.get $1
   call $~lib/rt/itcms/Object#unlink
   global.get $~lib/rt/itcms/pinSpace
   local.tee $3
   i32.load offset=8
   local.set $2
   local.get $1
   local.get $3
   i32.const 3
   i32.or
   i32.store offset=4
   local.get $1
   local.get $2
   i32.store offset=8
   local.get $2
   local.get $2
   i32.load offset=4
   i32.const 3
   i32.and
   local.get $1
   i32.or
   i32.store offset=4
   local.get $3
   local.get $1
   i32.store offset=8
  end
  local.get $0
 )
 (func $~lib/rt/itcms/__unpin (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  i32.eqz
  if
   return
  end
  local.get $0
  i32.const 20
  i32.sub
  local.tee $1
  i32.load offset=4
  i32.const 3
  i32.and
  i32.const 3
  i32.ne
  if
   i32.const 6128
   i32.const 1232
   i32.const 351
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/itcms/state
  i32.const 1
  i32.eq
  if
   local.get $1
   call $~lib/rt/itcms/Object#makeGray
  else
   local.get $1
   call $~lib/rt/itcms/Object#unlink
   global.get $~lib/rt/itcms/fromSpace
   local.tee $0
   i32.load offset=8
   local.set $2
   local.get $1
   global.get $~lib/rt/itcms/white
   local.get $0
   i32.or
   i32.store offset=4
   local.get $1
   local.get $2
   i32.store offset=8
   local.get $2
   local.get $2
   i32.load offset=4
   i32.const 3
   i32.and
   local.get $1
   i32.or
   i32.store offset=4
   local.get $0
   local.get $1
   i32.store offset=8
  end
 )
 (func $~lib/rt/itcms/__collect
  global.get $~lib/rt/itcms/state
  i32.const 0
  i32.gt_s
  if
   loop $while-continue|0
    global.get $~lib/rt/itcms/state
    if
     call $~lib/rt/itcms/step
     drop
     br $while-continue|0
    end
   end
  end
  call $~lib/rt/itcms/step
  drop
  loop $while-continue|1
   global.get $~lib/rt/itcms/state
   if
    call $~lib/rt/itcms/step
    drop
    br $while-continue|1
   end
  end
  global.get $~lib/rt/itcms/total
  i64.extend_i32_u
  i64.const 200
  i64.mul
  i64.const 100
  i64.div_u
  i32.wrap_i64
  i32.const 1024
  i32.add
  global.set $~lib/rt/itcms/threshold
 )
 (func $~lib/staticarray/StaticArray<logic/geom-types/Point>~visit (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  local.get $0
  i32.add
  local.set $2
  loop $while-continue|0
   local.get $0
   local.get $2
   i32.lt_u
   if
    local.get $0
    i32.load
    local.tee $1
    if
     local.get $1
     call $byn-split-outlined-A$~lib/rt/itcms/__visit
    end
    local.get $0
    i32.const 4
    i32.add
    local.set $0
    br $while-continue|0
   end
  end
 )
 (func $logic/squad/TaskTodo~visit (param $0 i32)
  (local $1 i32)
  local.get $0
  i32.load
  local.tee $1
  if
   local.get $1
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
  local.get $0
  i32.load offset=4
  local.tee $1
  if
   local.get $1
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
  local.get $0
  i32.load offset=8
  local.tee $0
  if
   local.get $0
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
 )
 (func $~lib/rt/__visit_members (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  block $folding-inner3
   block $folding-inner6
    block $folding-inner5
     block $folding-inner2
      block $folding-inner1
       block $folding-inner0
        block $invalid
         block $logic/factory/ProductionItem
          block $logic/factory/Factory
           block $logic/faction/Faction
            block $logic/bullets-manager/BulletData
             block $logic/bullets-manager/BulletRepresentation
              block $logic/ability-details/Usage
               block $logic/ability-details/Ability
                block $logic/squad-details/SquadDetails
                 block $logic/geom-types/UniquePoint
                  block $logic/unit/Unit
                   block $logic/squad/TaskTodo
                    block $logic/squad/Squad
                     block $logic/weapon-details/WeaponDetails
                      block $~lib/staticarray/StaticArray<~lib/staticarray/StaticArray<logic/geom-types/Point>>
                       block $~lib/staticarray/StaticArray<logic/geom-types/Point>
                        block $logic/geom-types/Point
                         block $~lib/staticarray/StaticArray<f32>
                          block $~lib/string/String
                           block $~lib/arraybuffer/ArrayBuffer
                            local.get $0
                            i32.const 8
                            i32.sub
                            i32.load
                            br_table $~lib/arraybuffer/ArrayBuffer $~lib/string/String $folding-inner5 $~lib/staticarray/StaticArray<f32> $logic/geom-types/Point $~lib/staticarray/StaticArray<logic/geom-types/Point> $~lib/staticarray/StaticArray<~lib/staticarray/StaticArray<logic/geom-types/Point>> $folding-inner0 $folding-inner1 $folding-inner1 $logic/weapon-details/WeaponDetails $folding-inner2 $folding-inner1 $folding-inner3 $logic/squad/Squad $logic/squad/TaskTodo $logic/unit/Unit $folding-inner1 $logic/geom-types/UniquePoint $folding-inner1 $logic/squad-details/SquadDetails $logic/ability-details/Ability $logic/ability-details/Usage $folding-inner1 $folding-inner1 $logic/bullets-manager/BulletRepresentation $folding-inner1 $logic/bullets-manager/BulletData $folding-inner1 $folding-inner2 $folding-inner2 $folding-inner2 $folding-inner1 $folding-inner1 $folding-inner6 $folding-inner3 $folding-inner3 $logic/faction/Faction $logic/factory/Factory $logic/factory/ProductionItem $folding-inner1 $folding-inner1 $folding-inner5 $folding-inner5 $folding-inner3 $folding-inner0 $folding-inner6 $folding-inner1 $folding-inner3 $folding-inner3 $folding-inner6 $folding-inner3 $folding-inner3 $folding-inner3 $folding-inner3 $folding-inner3 $folding-inner0 $folding-inner1 $folding-inner3 $folding-inner1 $folding-inner3 $folding-inner3 $folding-inner3 $folding-inner3 $folding-inner3 $folding-inner3 $folding-inner3 $folding-inner3 $folding-inner3 $folding-inner3 $folding-inner3 $folding-inner1 $folding-inner3 $folding-inner3 $folding-inner3 $folding-inner3 $invalid
                           end
                           return
                          end
                          return
                         end
                         return
                        end
                        return
                       end
                       local.get $0
                       call $~lib/staticarray/StaticArray<logic/geom-types/Point>~visit
                       return
                      end
                      local.get $0
                      call $~lib/staticarray/StaticArray<logic/geom-types/Point>~visit
                      return
                     end
                     return
                    end
                    local.get $0
                    i32.load offset=8
                    local.tee $1
                    if
                     local.get $1
                     call $byn-split-outlined-A$~lib/rt/itcms/__visit
                    end
                    local.get $0
                    i32.load offset=16
                    local.tee $1
                    if
                     local.get $1
                     call $byn-split-outlined-A$~lib/rt/itcms/__visit
                    end
                    local.get $0
                    i32.load offset=20
                    local.tee $1
                    if
                     local.get $1
                     call $byn-split-outlined-A$~lib/rt/itcms/__visit
                    end
                    local.get $0
                    i32.load offset=24
                    local.tee $1
                    if
                     local.get $1
                     call $byn-split-outlined-A$~lib/rt/itcms/__visit
                    end
                    local.get $0
                    i32.load offset=28
                    local.tee $1
                    if
                     local.get $1
                     call $byn-split-outlined-A$~lib/rt/itcms/__visit
                    end
                    local.get $0
                    i32.load offset=32
                    local.tee $1
                    if
                     local.get $1
                     call $byn-split-outlined-A$~lib/rt/itcms/__visit
                    end
                    local.get $0
                    i32.load offset=36
                    local.tee $1
                    if
                     local.get $1
                     call $byn-split-outlined-A$~lib/rt/itcms/__visit
                    end
                    local.get $0
                    i32.load offset=40
                    local.tee $1
                    if
                     local.get $1
                     call $byn-split-outlined-A$~lib/rt/itcms/__visit
                    end
                    local.get $0
                    i32.load offset=44
                    local.tee $0
                    if
                     local.get $0
                     call $byn-split-outlined-A$~lib/rt/itcms/__visit
                    end
                    return
                   end
                   local.get $0
                   call $logic/squad/TaskTodo~visit
                   return
                  end
                  local.get $0
                  i32.load offset=12
                  local.tee $1
                  if
                   local.get $1
                   call $byn-split-outlined-A$~lib/rt/itcms/__visit
                  end
                  local.get $0
                  i32.load offset=20
                  local.tee $1
                  if
                   local.get $1
                   call $byn-split-outlined-A$~lib/rt/itcms/__visit
                  end
                  local.get $0
                  i32.load offset=36
                  local.tee $1
                  if
                   local.get $1
                   call $byn-split-outlined-A$~lib/rt/itcms/__visit
                  end
                  local.get $0
                  i32.load offset=56
                  local.tee $0
                  if
                   local.get $0
                   call $byn-split-outlined-A$~lib/rt/itcms/__visit
                  end
                  return
                 end
                 return
                end
                local.get $0
                i32.load offset=20
                local.tee $0
                if
                 local.get $0
                 call $byn-split-outlined-A$~lib/rt/itcms/__visit
                end
                return
               end
               local.get $0
               i32.load offset=16
               local.tee $0
               if
                local.get $0
                call $byn-split-outlined-A$~lib/rt/itcms/__visit
               end
               return
              end
              return
             end
             return
            end
            local.get $0
            i32.load offset=4
            local.tee $1
            if
             local.get $1
             call $byn-split-outlined-A$~lib/rt/itcms/__visit
            end
            local.get $0
            i32.load offset=8
            local.tee $1
            if
             local.get $1
             call $byn-split-outlined-A$~lib/rt/itcms/__visit
            end
            local.get $0
            i32.load offset=12
            local.tee $0
            if
             local.get $0
             call $byn-split-outlined-A$~lib/rt/itcms/__visit
            end
            return
           end
           local.get $0
           call $logic/squad/TaskTodo~visit
           return
          end
          local.get $0
          i32.load
          local.tee $1
          if
           local.get $1
           call $byn-split-outlined-A$~lib/rt/itcms/__visit
          end
          local.get $0
          i32.load offset=8
          local.tee $0
          if
           local.get $0
           call $byn-split-outlined-A$~lib/rt/itcms/__visit
          end
          return
         end
         return
        end
        unreachable
       end
       local.get $0
       i32.load
       local.tee $1
       if
        local.get $1
        call $byn-split-outlined-A$~lib/rt/itcms/__visit
       end
       br $folding-inner3
      end
      local.get $0
      i32.load offset=4
      local.tee $1
      local.get $0
      i32.load offset=12
      i32.const 2
      i32.shl
      i32.add
      local.set $2
      loop $while-continue|0
       local.get $1
       local.get $2
       i32.lt_u
       if
        local.get $1
        i32.load
        local.tee $3
        if
         local.get $3
         call $byn-split-outlined-A$~lib/rt/itcms/__visit
        end
        local.get $1
        i32.const 4
        i32.add
        local.set $1
        br $while-continue|0
       end
      end
      br $folding-inner6
     end
     local.get $0
     i32.load
     local.tee $1
     if
      local.get $1
      call $byn-split-outlined-A$~lib/rt/itcms/__visit
     end
     local.get $0
     i32.load offset=8
     local.tee $2
     local.tee $1
     local.get $0
     i32.load offset=16
     i32.const 12
     i32.mul
     i32.add
     local.set $0
     loop $while-continue|025
      local.get $0
      local.get $1
      i32.gt_u
      if
       local.get $1
       i32.load offset=8
       i32.const 1
       i32.and
       i32.eqz
       if
        local.get $1
        i32.load offset=4
        local.tee $3
        if
         local.get $3
         call $byn-split-outlined-A$~lib/rt/itcms/__visit
        end
       end
       local.get $1
       i32.const 12
       i32.add
       local.set $1
       br $while-continue|025
      end
     end
     local.get $2
     if
      local.get $2
      call $byn-split-outlined-A$~lib/rt/itcms/__visit
     end
     return
    end
    local.get $0
    i32.load
    local.tee $0
    if
     local.get $0
     call $byn-split-outlined-A$~lib/rt/itcms/__visit
    end
    return
   end
   local.get $0
   i32.load
   local.tee $0
   if
    local.get $0
    call $byn-split-outlined-A$~lib/rt/itcms/__visit
   end
   return
  end
  local.get $0
  i32.load offset=4
  local.tee $0
  if
   local.get $0
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
 )
 (func $~start
  f32.const 1.4142135381698608
  global.set $logic/constants/SQUARE_OF_TWO
  call $start:logic/factory
  i32.const 0
  i32.const 1
  f32.const 0
  f32.const 0
  f32.const 0
  call $logic/faction/Faction#constructor
  global.set $logic/index/userFaction
 )
 (func $~lib/array/Array<logic/unit/Unit>#reduce<logic/geom-types/Point> (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  local.get $0
  i32.load offset=12
  local.set $4
  loop $for-loop|0
   local.get $4
   local.get $0
   i32.load offset=12
   local.tee $5
   local.get $4
   local.get $5
   i32.lt_s
   select
   local.get $3
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.tee $5
    local.get $0
    i32.load offset=4
    local.get $3
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $6
    i32.store
    local.get $5
    local.get $2
    local.get $6
    local.get $3
    local.get $0
    local.get $1
    i32.load
    call_indirect $0 (type $i32_i32_i32_i32_=>_i32)
    local.tee $2
    i32.store offset=4
    local.get $3
    i32.const 1
    i32.add
    local.set $3
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $start:logic/get-mean-angle~anonymous|0 (param $0 i32) (result f32)
  (local $1 f32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $3
  i64.const 0
  i64.store
  local.get $3
  i64.const 0
  i64.store offset=8
  local.get $3
  i32.const 2432
  i32.store
  local.get $3
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=8
  local.get $2
  f32.const 0
  f32.store
  local.get $2
  f32.const 0
  f32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $3
  local.get $0
  i32.const 2432
  local.get $2
  call $~lib/array/Array<logic/unit/Unit>#reduce<logic/geom-types/Point>
  local.tee $2
  i32.store offset=12
  local.get $2
  f32.load
  local.get $0
  i32.load offset=12
  f32.convert_i32_s
  local.tee $1
  f32.div
  local.get $2
  f32.load offset=4
  local.get $1
  f32.div
  call $~lib/math/NativeMathf.atan2
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/squad/Squad#constructor (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  local.tee $3
  i64.const 0
  i64.store
  local.get $3
  i64.const 0
  i64.store offset=8
  local.get $2
  i32.const 56
  i32.const 14
  call $~lib/rt/itcms/__new
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  i32.store offset=48
  local.get $2
  local.get $1
  i32.store offset=52
  local.get $2
  i32.const 0
  i32.store
  local.get $2
  i32.const 0
  i32.store16 offset=4
  local.get $2
  i32.const 0
  i32.store8 offset=6
  local.get $2
  i32.const 0
  i32.store offset=8
  local.get $2
  i32.const 0
  i32.store8 offset=12
  local.get $2
  i32.const 0
  i32.store offset=16
  local.get $2
  i32.const 0
  i32.store offset=20
  local.get $2
  i32.const 0
  i32.store offset=24
  local.get $2
  i32.const 0
  i32.store offset=28
  local.get $2
  i32.const 0
  i32.store offset=32
  local.get $2
  i32.const 0
  i32.store offset=36
  local.get $2
  i32.const 0
  i32.store offset=40
  local.get $2
  i32.const 0
  i32.store offset=44
  global.get $logic/get-id/id
  i32.const 1
  i32.add
  global.set $logic/get-id/id
  local.get $2
  global.get $logic/get-id/id
  i32.store
  local.get $2
  i32.const 0
  i32.store16 offset=4
  local.get $2
  i32.const 0
  i32.const 17
  i32.const 2576
  call $~lib/rt/__newArray
  local.tee $0
  i32.store offset=16
  local.get $0
  if
   local.get $2
   local.get $0
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  local.get $2
  i32.const 0
  i32.store8 offset=6
  global.get $~lib/memory/__stack_pointer
  call $logic/squad/TaskTodo#constructor
  local.tee $0
  i32.store offset=4
  local.get $0
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $2
  local.get $0
  i32.store offset=8
  local.get $0
  if
   local.get $2
   local.get $0
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  local.get $2
  i32.const 0
  i32.store8 offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $0
  i32.store offset=8
  local.get $0
  f32.const 0
  f32.store
  local.get $0
  f32.const 0
  f32.store offset=4
  local.get $2
  local.get $0
  i32.store offset=36
  local.get $0
  if
   local.get $2
   local.get $0
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  local.get $2
  i32.const 0
  i32.const 19
  i32.const 2608
  call $~lib/rt/__newArray
  local.tee $0
  i32.store offset=32
  local.get $0
  if
   local.get $2
   local.get $0
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  local.get $2
  i32.const 0
  i32.store offset=20
  local.get $2
  i32.const 0
  i32.store offset=24
  local.get $2
  i32.const 0
  i32.store offset=28
  global.get $~lib/memory/__stack_pointer
  global.get $logic/squad-details/SQUAD_DETAILS
  local.tee $0
  i32.store offset=12
  local.get $2
  local.get $0
  local.get $1
  call $~lib/map/Map<i32,logic/ability-details/Ability>#get
  local.tee $0
  i32.store offset=40
  local.get $0
  if
   local.get $2
   local.get $0
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  global.get $~lib/memory/__stack_pointer
  global.get $logic/weapon-details/WEAPON_DETAILS
  local.tee $0
  i32.store offset=12
  local.get $2
  local.get $0
  i32.const 0
  call $~lib/map/Map<i32,logic/ability-details/Ability>#get
  local.tee $0
  i32.store offset=44
  local.get $0
  if
   local.get $2
   local.get $0
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $logic/squad/Squad#addMember (param $0 i32) (param $1 f32) (param $2 f32) (param $3 f32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $5
   i64.const 0
   i64.store
   local.get $5
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $6
   local.tee $7
   i64.const 0
   i64.store
   local.get $7
   i32.const 0
   i32.store offset=8
   local.get $6
   i32.const 61
   i32.const 16
   call $~lib/rt/itcms/__new
   local.tee $6
   i32.store
   local.get $6
   f32.const 0
   f32.store
   local.get $6
   f32.const 0
   f32.store offset=4
   local.get $6
   f32.const 0
   f32.store offset=8
   local.get $6
   i32.const 0
   i32.store offset=12
   local.get $6
   i32.const 0
   i32.store8 offset=16
   local.get $6
   i32.const 0
   i32.store16 offset=18
   local.get $6
   i32.const 0
   i32.store offset=20
   local.get $6
   i32.const 0
   i32.store16 offset=24
   local.get $6
   f32.const 0
   f32.store offset=28
   local.get $6
   f32.const 0
   f32.store offset=32
   local.get $6
   i32.const 0
   i32.store offset=36
   local.get $6
   i32.const 0
   i32.store offset=40
   local.get $6
   f32.const 0
   f32.store offset=44
   local.get $6
   f32.const 0
   f32.store offset=48
   local.get $6
   f32.const 0
   f32.store offset=52
   local.get $6
   i32.const 0
   i32.store offset=56
   local.get $6
   i32.const 0
   i32.store8 offset=60
   local.get $6
   local.get $1
   f32.store offset=44
   local.get $6
   local.get $2
   f32.store offset=48
   local.get $6
   local.get $3
   f32.store offset=52
   local.get $6
   local.get $0
   i32.store offset=56
   local.get $0
   if
    local.get $6
    local.get $0
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   global.get $logic/get-id/id
   i32.const 1
   i32.add
   global.set $logic/get-id/id
   local.get $6
   global.get $logic/get-id/id
   f32.convert_i32_u
   f32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $7
   i32.store offset=4
   local.get $7
   f32.const 0
   f32.store
   local.get $7
   f32.const 0
   f32.store offset=4
   local.get $6
   local.get $7
   i32.store offset=36
   local.get $7
   if
    local.get $6
    local.get $7
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   local.get $6
   f32.const 0
   f32.store offset=4
   local.get $6
   f32.const 0
   f32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $7
   i32.store offset=8
   local.get $7
   local.get $1
   f32.store
   local.get $7
   local.get $2
   f32.store offset=4
   local.get $6
   local.get $7
   i32.store offset=12
   local.get $7
   if
    local.get $6
    local.get $7
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   local.get $6
   i32.const 255
   i32.store8 offset=16
   local.get $6
   i32.const 0
   i32.store16 offset=18
   local.get $6
   i32.const 0
   i32.store offset=20
   local.get $6
   local.get $0
   i32.load offset=40
   i32.load16_u offset=8
   i32.store16 offset=24
   local.get $6
   f32.const 0
   f32.store offset=28
   local.get $6
   f32.const 0
   f32.store offset=32
   local.get $6
   i32.const 4
   i32.store offset=40
   local.get $6
   i32.const 0
   i32.store8 offset=60
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $5
   local.get $6
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load offset=16
   local.tee $5
   i32.store offset=4
   local.get $5
   local.get $6
   call $~lib/array/Array<logic/geom-types/Point>#push
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $5
   i64.const 0
   i64.store
   local.get $5
   i32.const 0
   i32.store offset=8
   local.get $5
   global.get $logic/position-utils/UNITS_OFFSET
   local.tee $7
   i32.store
   local.get $5
   local.get $0
   i32.load offset=16
   local.tee $8
   i32.store offset=4
   local.get $5
   local.get $8
   i32.load offset=12
   i32.const 1
   i32.sub
   i32.const 2
   i32.shl
   local.get $7
   i32.add
   i32.load
   local.tee $7
   i32.store offset=8
   loop $for-loop|0
    local.get $7
    i32.const 20
    i32.sub
    i32.load offset=16
    i32.const 2
    i32.shr_u
    local.get $4
    i32.gt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=16
     local.tee $5
     i32.store
     local.get $4
     i32.const 2
     i32.shl
     local.tee $8
     local.get $5
     i32.load offset=4
     i32.add
     i32.load
     local.tee $5
     local.get $7
     local.get $8
     i32.add
     i32.load
     local.tee $8
     i32.store offset=36
     local.get $8
     if
      local.get $5
      local.get $8
      i32.const 0
      call $byn-split-outlined-A$~lib/rt/itcms/__link
     end
     local.get $4
     i32.const 1
     i32.add
     local.set $4
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $6
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/squad/Squad#updateCenter (param $0 i32)
  (local $1 f32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $3
  i64.const 0
  i64.store
  local.get $3
  i64.const 0
  i64.store offset=8
  local.get $3
  i32.const 0
  i32.store offset=16
  local.get $3
  local.get $0
  i32.load offset=16
  local.tee $4
  i32.store
  local.get $3
  i32.const 2640
  i32.store offset=4
  local.get $3
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store offset=12
  local.get $2
  f32.const 0
  f32.store
  local.get $2
  f32.const 0
  f32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=8
  local.get $3
  local.get $4
  i32.const 2640
  local.get $2
  call $~lib/array/Array<logic/unit/Unit>#reduce<logic/geom-types/Point>
  local.tee $2
  i32.store offset=16
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load offset=16
  local.tee $3
  i32.store
  local.get $0
  i32.load offset=36
  local.get $2
  f32.load
  local.get $3
  i32.load offset=12
  f32.convert_i32_s
  local.tee $1
  f32.div
  f32.store
  local.get $0
  i32.load offset=36
  local.get $2
  f32.load offset=4
  local.get $1
  f32.div
  f32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/faction/Faction#constructor (param $0 i32) (param $1 i32) (param $2 f32) (param $3 f32) (param $4 f32) (result i32)
  (local $5 f32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $6
   local.tee $7
   i64.const 0
   i64.store
   local.get $7
   i32.const 0
   i32.store offset=8
   local.get $6
   i32.const 21
   i32.const 37
   call $~lib/rt/itcms/__new
   local.tee $6
   i32.store
   local.get $6
   local.get $0
   i32.store offset=16
   local.get $6
   local.get $1
   i32.store8 offset=20
   local.get $6
   i32.const 0
   i32.store
   local.get $6
   i32.const 0
   i32.store offset=4
   local.get $6
   i32.const 0
   i32.store offset=8
   local.get $6
   i32.const 0
   i32.store offset=12
   local.get $6
   local.get $0
   i32.const 1
   call $logic/squad/Squad#constructor
   local.tee $7
   i32.store offset=8
   local.get $7
   if
    local.get $6
    local.get $7
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   global.get $~lib/memory/__stack_pointer
   local.tee $7
   local.get $6
   i32.load offset=8
   local.tee $8
   i32.store offset=4
   local.get $7
   local.get $8
   local.get $2
   local.get $3
   local.get $4
   call $logic/squad/Squad#addMember
   local.tee $7
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $6
   i32.load offset=8
   local.tee $8
   i32.store offset=4
   local.get $8
   call $logic/squad/Squad#updateCenter
   local.get $7
   f32.load
   local.set $5
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $7
   i32.const 0
   i32.store
   local.get $7
   i32.const 37
   i32.const 38
   call $~lib/rt/itcms/__new
   local.tee $7
   i32.store
   local.get $7
   local.get $5
   f32.store offset=16
   local.get $7
   local.get $0
   i32.store offset=20
   local.get $7
   local.get $2
   f32.store offset=24
   local.get $7
   local.get $3
   f32.store offset=28
   local.get $7
   local.get $4
   f32.store offset=32
   local.get $7
   local.get $1
   i32.store8 offset=36
   local.get $7
   i32.const 0
   i32.store
   local.get $7
   i32.const 0
   i32.store16 offset=4
   local.get $7
   i32.const 0
   i32.store offset=8
   local.get $7
   i32.const 0
   i32.store8 offset=12
   local.get $7
   i32.const 0
   i32.const 40
   i32.const 2672
   call $~lib/rt/__newArray
   local.tee $0
   i32.store
   local.get $0
   if
    local.get $7
    local.get $0
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   local.get $7
   i32.const 0
   i32.store16 offset=4
   local.get $7
   i32.const 0
   i32.store offset=8
   local.get $7
   i32.const 0
   i32.store8 offset=12
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $6
   local.get $7
   i32.store
   local.get $7
   if
    local.get $6
    local.get $7
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   local.get $6
   i32.const 0
   i32.store offset=12
   local.get $6
   i32.const 0
   i32.const 23
   i32.const 2704
   call $~lib/rt/__newArray
   local.tee $0
   i32.store offset=4
   local.get $0
   if
    local.get $6
    local.get $0
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $6
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/obstacles-manager/getConnectedPoints (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $4
  i64.const 0
  i64.store
  local.get $4
  i64.const 0
  i64.store offset=8
  local.get $4
  i32.const 0
  i32.store offset=16
  local.get $4
  i32.const 1
  i32.const 33
  i32.const 0
  call $~lib/rt/__newArray
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.load offset=4
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.const 0
  i32.const 32
  i32.const 2800
  call $~lib/rt/__newArray
  call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
  local.get $4
  local.get $1
  i32.store offset=4
  loop $while-continue|0
   local.get $0
   i32.load offset=8
   i32.const 2
   i32.shr_u
   local.get $2
   i32.gt_s
   if
    local.get $0
    local.get $2
    call $~lib/typedarray/Float32Array#__get
    f32.const -1
    f32.eq
    if (result i32)
     i32.const 0
     i32.const 32
     i32.const 2832
     call $~lib/rt/__newArray
     local.set $4
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.store offset=8
     local.get $1
     local.get $4
     call $~lib/array/Array<logic/geom-types/Point>#push
     local.get $3
     i32.const 1
     i32.add
     local.set $3
     local.get $2
     i32.const 1
     i32.add
    else
     local.get $1
     local.get $3
     call $~lib/array/Array<logic/geom-types/Point>#__get
     local.set $4
     global.get $~lib/memory/__stack_pointer
     local.tee $5
     local.get $4
     i32.store offset=12
     local.get $5
     i32.const 0
     call $logic/geom-types/Point#constructor
     local.tee $5
     i32.store offset=16
     local.get $5
     local.get $0
     local.get $2
     call $~lib/typedarray/Float32Array#__get
     f32.store
     local.get $5
     local.get $0
     local.get $2
     i32.const 1
     i32.add
     call $~lib/typedarray/Float32Array#__get
     f32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store offset=8
     local.get $4
     local.get $5
     call $~lib/array/Array<logic/geom-types/Point>#push
     local.get $2
     i32.const 2
     i32.add
    end
    local.set $2
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $logic/obstacles-manager/getConnectedLines (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  i64.const 0
  i64.store offset=8
  local.get $1
  i32.const 0
  i32.const 8
  i32.const 2864
  call $~lib/rt/__newArray
  local.tee $4
  i32.store
  loop $for-loop|0
   local.get $0
   i32.load offset=12
   local.get $3
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    local.get $3
    call $~lib/array/Array<logic/geom-types/Point>#__get
    local.tee $1
    i32.store offset=4
    i32.const 0
    local.set $2
    loop $for-loop|1
     local.get $1
     i32.load offset=12
     local.get $2
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      call $logic/geom-types/Line#constructor
      local.tee $5
      i32.store offset=12
      local.get $5
      local.get $1
      local.get $2
      call $~lib/array/Array<logic/geom-types/Point>#__get
      local.tee $6
      i32.store
      local.get $6
      if
       local.get $5
       local.get $6
       i32.const 0
       call $byn-split-outlined-A$~lib/rt/itcms/__link
      end
      local.get $5
      local.get $1
      local.get $2
      i32.const 1
      i32.add
      local.tee $2
      local.get $1
      i32.load offset=12
      i32.rem_s
      call $~lib/array/Array<logic/geom-types/Point>#__get
      local.tee $6
      i32.store offset=4
      local.get $6
      if
       local.get $5
       local.get $6
       i32.const 0
       call $byn-split-outlined-A$~lib/rt/itcms/__link
      end
      global.get $~lib/memory/__stack_pointer
      local.get $5
      i32.store offset=8
      local.get $4
      local.get $5
      call $~lib/array/Array<logic/geom-types/Point>#push
      br $for-loop|1
     end
    end
    local.get $3
    i32.const 1
    i32.add
    local.set $3
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $4
 )
 (func $~lib/array/Array<logic/geom-types/Point>#map<logic/geom-types/Line> (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $3
  i64.const 0
  i64.store
  local.get $3
  i32.const 0
  i32.store offset=8
  local.get $3
  local.get $0
  i32.load offset=12
  local.tee $3
  i32.const 8
  i32.const 0
  call $~lib/rt/__newArray
  local.tee $7
  i32.store
  local.get $7
  i32.load offset=4
  local.set $4
  loop $for-loop|0
   local.get $3
   local.get $0
   i32.load offset=12
   local.tee $5
   local.get $3
   local.get $5
   i32.lt_s
   select
   local.get $2
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.tee $8
    local.get $2
    i32.const 2
    i32.shl
    local.tee $5
    local.get $0
    i32.load offset=4
    i32.add
    i32.load
    local.tee $6
    i32.store offset=4
    local.get $8
    local.get $6
    local.get $2
    local.get $0
    local.get $1
    i32.load
    call_indirect $0 (type $i32_i32_i32_=>_i32)
    local.tee $6
    i32.store offset=8
    local.get $4
    local.get $5
    i32.add
    local.get $6
    i32.store
    local.get $6
    if
     local.get $7
     local.get $6
     i32.const 1
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $7
 )
 (func $logic/geom-utils/checkIntersection<logic/geom-types/Line,logic/geom-types/Line> (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 f32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 f32)
  (local $8 f32)
  (local $9 f32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i64.const 0
  i64.store
  local.get $2
  i32.const 0
  i32.store offset=8
  local.get $2
  local.get $0
  i32.load
  local.tee $4
  i32.store
  local.get $2
  local.get $0
  i32.load offset=4
  local.tee $5
  i32.store offset=4
  local.get $2
  local.get $1
  i32.load
  local.tee $6
  i32.store offset=8
  local.get $5
  f32.load offset=4
  local.tee $3
  local.get $4
  f32.load offset=4
  f32.sub
  local.get $6
  f32.load
  local.get $5
  f32.load
  local.tee $7
  f32.sub
  f32.mul
  local.get $7
  local.get $4
  f32.load
  f32.sub
  local.get $6
  f32.load offset=4
  local.get $3
  f32.sub
  f32.mul
  f32.sub
  local.set $3
  local.get $2
  local.get $0
  i32.load
  local.tee $4
  i32.store
  local.get $2
  local.get $0
  i32.load offset=4
  local.tee $5
  i32.store offset=4
  local.get $2
  local.get $1
  i32.load offset=4
  local.tee $6
  i32.store offset=8
  local.get $5
  f32.load offset=4
  local.tee $7
  local.get $4
  f32.load offset=4
  f32.sub
  local.get $6
  f32.load
  local.get $5
  f32.load
  local.tee $8
  f32.sub
  f32.mul
  local.get $8
  local.get $4
  f32.load
  f32.sub
  local.get $6
  f32.load offset=4
  local.get $7
  f32.sub
  f32.mul
  f32.sub
  local.set $7
  local.get $2
  local.get $1
  i32.load
  local.tee $4
  i32.store
  local.get $2
  local.get $1
  i32.load offset=4
  local.tee $5
  i32.store offset=4
  local.get $2
  local.get $0
  i32.load
  local.tee $6
  i32.store offset=8
  local.get $5
  f32.load offset=4
  local.tee $8
  local.get $4
  f32.load offset=4
  f32.sub
  local.get $6
  f32.load
  local.get $5
  f32.load
  local.tee $9
  f32.sub
  f32.mul
  local.get $9
  local.get $4
  f32.load
  f32.sub
  local.get $6
  f32.load offset=4
  local.get $8
  f32.sub
  f32.mul
  f32.sub
  local.set $8
  local.get $2
  local.get $1
  i32.load
  local.tee $4
  i32.store
  local.get $2
  local.get $1
  i32.load offset=4
  local.tee $1
  i32.store offset=4
  local.get $2
  local.get $0
  i32.load offset=4
  local.tee $0
  i32.store offset=8
  i32.const 2
  local.get $8
  f32.const 0
  f32.gt
  local.get $8
  f32.const 0
  f32.lt
  select
  i32.const 2
  local.get $1
  f32.load offset=4
  local.tee $8
  local.get $4
  f32.load offset=4
  f32.sub
  local.get $0
  f32.load
  local.get $1
  f32.load
  local.tee $9
  f32.sub
  f32.mul
  local.get $9
  local.get $4
  f32.load
  f32.sub
  local.get $0
  f32.load offset=4
  local.get $8
  f32.sub
  f32.mul
  f32.sub
  local.tee $8
  f32.const 0
  f32.gt
  local.get $8
  f32.const 0
  f32.lt
  select
  i32.ne
  if (result i32)
   i32.const 2
   local.get $3
   f32.const 0
   f32.gt
   local.get $3
   f32.const 0
   f32.lt
   select
   i32.const 2
   local.get $7
   f32.const 0
   f32.gt
   local.get $7
   f32.const 0
   f32.lt
   select
   i32.ne
  else
   i32.const 0
  end
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
  else
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
  end
 )
 (func $logic/geom-utils/isPointInPolygon (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $4
  i64.const 0
  i64.store
  local.get $4
  i64.const 0
  i64.store offset=8
  local.get $4
  call $logic/geom-types/Line#constructor
  local.tee $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $5
  i32.store offset=4
  local.get $5
  local.get $0
  f32.load
  f32.store
  local.get $5
  f32.const -1
  f32.store offset=4
  local.get $2
  local.get $5
  i32.store
  local.get $5
  if
   local.get $2
   local.get $5
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  local.get $2
  local.get $0
  i32.store offset=4
  local.get $0
  if
   local.get $2
   local.get $0
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  local.get $4
  local.get $2
  i32.store offset=8
  i32.const 0
  local.set $0
  loop $for-loop|0
   local.get $1
   i32.load offset=12
   local.get $0
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.load offset=4
    local.get $0
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $4
    i32.store offset=12
    local.get $3
    i32.const 1
    i32.add
    local.get $3
    local.get $2
    local.get $4
    call $logic/geom-utils/checkIntersection<logic/geom-types/Line,logic/geom-types/Line>
    select
    local.set $3
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $3
  i32.const 1
  i32.and
 )
 (func $logic/obstacles-manager/getAllLinesWithinPolygon (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $3
  i64.const 0
  i64.store
  local.get $3
  i64.const 0
  i64.store offset=8
  local.get $3
  i32.const 0
  i32.store offset=16
  local.get $3
  i32.const 0
  i32.const 8
  i32.const 2896
  call $~lib/rt/__newArray
  local.tee $7
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 2928
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.const 2928
  call $~lib/array/Array<logic/geom-types/Point>#map<logic/geom-types/Line>
  local.tee $5
  i32.store offset=8
  loop $for-loop|0
   local.get $0
   i32.load offset=12
   local.get $2
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    local.get $2
    call $~lib/array/Array<logic/geom-types/Point>#__get
    local.tee $6
    i32.store offset=12
    i32.const 0
    local.set $3
    i32.const 0
    local.set $1
    loop $for-loop|1
     local.get $5
     i32.load offset=12
     local.get $1
     i32.gt_s
     if
      block $for-break1
       local.get $5
       local.get $1
       call $~lib/array/Array<logic/geom-types/Point>#__get
       local.set $4
       global.get $~lib/memory/__stack_pointer
       local.get $4
       i32.store offset=4
       local.get $6
       local.get $4
       call $logic/geom-utils/checkIntersection<logic/geom-types/Line,logic/geom-types/Line>
       if
        i32.const 1
        local.set $3
        br $for-break1
       end
       local.get $1
       i32.const 1
       i32.add
       local.set $1
       br $for-loop|1
      end
     end
    end
    block $for-continue|0
     local.get $3
     if
      local.get $7
      local.get $6
      call $~lib/array/Array<logic/geom-types/Point>#push
      br $for-continue|0
     end
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.load
     local.tee $1
     i32.store offset=16
     local.get $1
     local.get $5
     call $logic/geom-utils/isPointInPolygon
     if
      local.get $7
      local.get $6
      call $~lib/array/Array<logic/geom-types/Point>#push
     end
    end
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $7
 )
 (func $logic/obstacles-manager/getMap (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 f32)
  (local $4 f32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 72
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i64.const 0
  i64.store
  local.get $2
  i64.const 0
  i64.store offset=8
  local.get $2
  i64.const 0
  i64.store offset=16
  local.get $2
  i64.const 0
  i64.store offset=24
  local.get $2
  i64.const 0
  i64.store offset=32
  local.get $2
  i64.const 0
  i64.store offset=40
  local.get $2
  i64.const 0
  i64.store offset=48
  local.get $2
  i64.const 0
  i64.store offset=56
  local.get $2
  i64.const 0
  i64.store offset=64
  local.get $2
  local.get $0
  call $logic/obstacles-manager/getConnectedPoints
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  call $logic/obstacles-manager/getConnectedLines
  local.tee $6
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  global.get $logic/obstacles-manager/OBSTACLES_MAP_WIDTH
  global.get $logic/obstacles-manager/OBSTACLES_MAP_HEIGHT
  i32.mul
  call $~lib/array/Array<~lib/array/Array<logic/geom-types/Line>|null>#constructor
  local.tee $2
  i32.store offset=8
  loop $for-loop|0
   global.get $logic/obstacles-manager/OBSTACLES_MAP_HEIGHT
   local.get $1
   i32.gt_s
   if
    i32.const 0
    local.set $0
    loop $for-loop|1
     global.get $logic/obstacles-manager/OBSTACLES_MAP_WIDTH
     local.get $0
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.tee $7
      i32.const 0
      call $logic/geom-types/Point#constructor
      local.tee $5
      i32.store offset=12
      local.get $5
      local.get $0
      f32.convert_i32_s
      f32.const 300
      f32.mul
      f32.store
      local.get $5
      local.get $1
      f32.convert_i32_s
      f32.const 300
      f32.mul
      f32.store offset=4
      local.get $7
      local.get $5
      i32.store offset=16
      global.get $~lib/memory/__stack_pointer
      global.get $~lib/memory/__stack_pointer
      i32.const 4
      i32.const 32
      i32.const 0
      call $~lib/rt/__newArray
      local.tee $8
      i32.store offset=20
      global.get $~lib/memory/__stack_pointer
      local.get $8
      i32.load offset=4
      i32.store offset=24
      global.get $~lib/memory/__stack_pointer
      i32.const 0
      call $logic/geom-types/Point#constructor
      local.tee $9
      i32.store offset=28
      local.get $9
      local.get $5
      f32.load
      f32.store
      local.get $9
      local.get $5
      f32.load offset=4
      f32.store offset=4
      local.get $8
      i32.const 0
      local.get $9
      call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
      global.get $~lib/memory/__stack_pointer
      i32.const 0
      call $logic/geom-types/Point#constructor
      local.tee $9
      i32.store offset=32
      local.get $9
      local.get $5
      f32.load
      f32.const 300
      f32.add
      f32.store
      local.get $9
      local.get $5
      f32.load offset=4
      f32.store offset=4
      local.get $8
      i32.const 1
      local.get $9
      call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
      global.get $~lib/memory/__stack_pointer
      i32.const 0
      call $logic/geom-types/Point#constructor
      local.tee $9
      i32.store offset=36
      local.get $9
      local.get $5
      f32.load
      f32.const 300
      f32.add
      f32.store
      local.get $9
      local.get $5
      f32.load offset=4
      f32.const 300
      f32.add
      f32.store offset=4
      local.get $8
      i32.const 2
      local.get $9
      call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
      global.get $~lib/memory/__stack_pointer
      i32.const 0
      call $logic/geom-types/Point#constructor
      local.tee $9
      i32.store offset=40
      local.get $9
      local.get $5
      f32.load
      f32.store
      local.get $9
      local.get $5
      f32.load offset=4
      f32.const 300
      f32.add
      f32.store offset=4
      local.get $8
      i32.const 3
      local.get $9
      call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
      local.get $8
      i32.store offset=24
      global.get $~lib/memory/__stack_pointer
      local.get $6
      local.get $8
      call $logic/obstacles-manager/getAllLinesWithinPolygon
      local.tee $7
      i32.store offset=20
      local.get $0
      global.get $logic/obstacles-manager/OBSTACLES_MAP_WIDTH
      local.get $1
      i32.mul
      i32.add
      local.set $8
      block $for-continue|1
       local.get $7
       i32.load offset=12
       i32.eqz
       if
        local.get $5
        local.get $6
        call $logic/geom-utils/isPointInPolygon
        i32.eqz
        if
         i32.const 0
         i32.const 8
         i32.const 2960
         call $~lib/rt/__newArray
         local.set $5
         global.get $~lib/memory/__stack_pointer
         local.get $5
         i32.store offset=44
         local.get $2
         local.get $8
         local.get $5
         call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__set
        end
        br $for-continue|1
       end
       global.get $logic/obstacles-manager/OBSTACLES_MAP_WIDTH_HALF
       local.get $0
       i32.ge_s
       if (result f32)
        f32.const 0
       else
        local.get $5
        f32.load
       end
       local.set $3
       global.get $logic/obstacles-manager/OBSTACLES_MAP_WIDTH_HALF
       local.get $0
       i32.ge_s
       if (result f32)
        local.get $5
        f32.load
        f32.const 300
        f32.add
       else
        global.get $logic/obstacles-manager/MAP_WIDTH
       end
       local.set $4
       global.get $~lib/memory/__stack_pointer
       local.tee $7
       i32.const 4
       i32.const 32
       i32.const 0
       call $~lib/rt/__newArray
       local.tee $9
       i32.store offset=48
       global.get $~lib/memory/__stack_pointer
       local.get $9
       i32.load offset=4
       i32.store offset=52
       global.get $~lib/memory/__stack_pointer
       i32.const 0
       call $logic/geom-types/Point#constructor
       local.tee $10
       i32.store offset=56
       local.get $10
       local.get $3
       f32.store
       local.get $10
       local.get $5
       f32.load offset=4
       f32.store offset=4
       local.get $9
       i32.const 0
       local.get $10
       call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
       global.get $~lib/memory/__stack_pointer
       i32.const 0
       call $logic/geom-types/Point#constructor
       local.tee $10
       i32.store offset=60
       local.get $10
       local.get $4
       f32.store
       local.get $10
       local.get $5
       f32.load offset=4
       f32.store offset=4
       local.get $9
       i32.const 1
       local.get $10
       call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
       global.get $~lib/memory/__stack_pointer
       i32.const 0
       call $logic/geom-types/Point#constructor
       local.tee $10
       i32.store offset=64
       local.get $10
       local.get $4
       f32.store
       local.get $10
       local.get $5
       f32.load offset=4
       f32.const 300
       f32.add
       f32.store offset=4
       local.get $9
       i32.const 2
       local.get $10
       call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
       global.get $~lib/memory/__stack_pointer
       i32.const 0
       call $logic/geom-types/Point#constructor
       local.tee $10
       i32.store offset=68
       local.get $10
       local.get $3
       f32.store
       local.get $10
       local.get $5
       f32.load offset=4
       f32.const 300
       f32.add
       f32.store offset=4
       local.get $9
       i32.const 3
       local.get $10
       call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
       local.get $7
       local.get $9
       i32.store offset=52
       local.get $6
       local.get $9
       call $logic/obstacles-manager/getAllLinesWithinPolygon
       local.set $5
       global.get $~lib/memory/__stack_pointer
       local.get $5
       i32.store offset=44
       local.get $2
       local.get $8
       local.get $5
       call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__set
      end
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      br $for-loop|1
     end
    end
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 72
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $logic/track-manager/insertLinesToGraph (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $3
  i64.const 0
  i64.store
  local.get $3
  i64.const 0
  i64.store offset=8
  local.get $0
  i32.load
  local.get $0
  i32.load offset=4
  local.get $1
  i32.load offset=8
  local.tee $4
  i32.const -1028477379
  i32.mul
  i32.const 374761397
  i32.add
  i32.const 17
  i32.rotl
  i32.const 668265263
  i32.mul
  local.tee $3
  local.get $3
  i32.const 15
  i32.shr_u
  i32.xor
  i32.const -2048144777
  i32.mul
  local.tee $3
  local.get $3
  i32.const 13
  i32.shr_u
  i32.xor
  i32.const -1028477379
  i32.mul
  local.tee $3
  local.get $3
  i32.const 16
  i32.shr_u
  i32.xor
  i32.and
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $3
  block $__inlined_func$~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#find
   loop $while-continue|0
    local.get $3
    if
     local.get $3
     i32.load offset=8
     local.tee $5
     i32.const 1
     i32.and
     if (result i32)
      i32.const 0
     else
      local.get $4
      local.get $3
      i32.load
      i32.eq
     end
     br_if $__inlined_func$~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#find
     local.get $5
     i32.const -2
     i32.and
     local.set $3
     br $while-continue|0
    end
   end
   i32.const 0
   local.set $3
  end
  local.get $3
  if
   local.get $0
   local.get $1
   i32.load offset=8
   call $~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#get
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   local.get $2
   call $~lib/array/Array<logic/geom-types/Point>#push
  else
   local.get $1
   i32.load offset=8
   local.set $1
   global.get $~lib/memory/__stack_pointer
   i32.const 1
   i32.const 19
   i32.const 0
   call $~lib/rt/__newArray
   local.tee $3
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.load offset=4
   i32.store offset=12
   local.get $3
   i32.const 0
   local.get $2
   call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=4
   local.get $0
   local.get $1
   local.get $3
   call $~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#set
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/track-manager/createPermanentTrackGraph (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $4
   i64.const 0
   i64.store
   local.get $4
   i64.const 0
   i64.store offset=8
   local.get $4
   i64.const 0
   i64.store offset=16
   local.get $4
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $4
   i64.const 0
   i64.store
   local.get $4
   i32.const 0
   i32.store offset=8
   local.get $4
   i32.const 0
   i32.const 19
   i32.const 2992
   call $~lib/rt/__newArray
   local.tee $4
   i32.store
   loop $while-continue|0
    local.get $1
    i32.load offset=8
    i32.const 2
    i32.shr_u
    local.get $3
    i32.gt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.tee $5
     call $logic/geom-types/UniquePoint#constructor
     local.tee $6
     i32.store offset=4
     global.get $logic/get-id/id
     i32.const 1
     i32.add
     global.set $logic/get-id/id
     local.get $6
     global.get $logic/get-id/id
     i32.store offset=8
     local.get $6
     local.get $1
     i32.load offset=4
     local.get $3
     i32.const 2
     i32.shl
     i32.add
     f32.load
     f32.store
     local.get $6
     local.get $1
     i32.load offset=4
     local.get $3
     i32.const 1
     i32.add
     i32.const 2
     i32.shl
     i32.add
     f32.load
     f32.store offset=4
     local.get $5
     local.get $6
     i32.store offset=8
     local.get $4
     local.get $6
     call $~lib/array/Array<logic/geom-types/Point>#push
     local.get $3
     i32.const 2
     i32.add
     local.set $3
     br $while-continue|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $4
   global.set $logic/track-manager/trackPoints
   global.get $~lib/memory/__stack_pointer
   local.get $0
   call $logic/obstacles-manager/getConnectedPoints
   local.tee $0
   i32.store
   local.get $0
   call $logic/obstacles-manager/getConnectedLines
   global.set $logic/track-manager/blockingTrackLines
   i32.const 0
   local.set $3
   loop $for-loop|0
    global.get $~lib/memory/__stack_pointer
    global.get $logic/track-manager/trackPoints
    local.tee $0
    i32.store offset=4
    local.get $0
    i32.load offset=12
    local.get $3
    i32.gt_s
    if
     local.get $3
     i32.const 1
     i32.add
     local.tee $0
     i32.const 1
     i32.add
     local.get $0
     local.get $3
     i32.const 1
     i32.and
     i32.eqz
     local.get $2
     local.get $3
     i32.ge_s
     i32.and
     select
     local.set $0
     loop $for-loop|1
      global.get $~lib/memory/__stack_pointer
      global.get $logic/track-manager/trackPoints
      local.tee $1
      i32.store offset=4
      local.get $1
      i32.load offset=12
      local.get $0
      i32.gt_s
      if
       i32.const 0
       local.set $4
       global.get $~lib/memory/__stack_pointer
       local.tee $1
       call $logic/geom-types/UniqueLine#constructor
       local.tee $5
       i32.store offset=8
       global.get $~lib/memory/__stack_pointer
       global.get $logic/track-manager/trackPoints
       local.tee $6
       i32.store offset=4
       local.get $5
       local.get $6
       local.get $3
       call $~lib/array/Array<logic/geom-types/Point>#__get
       local.tee $6
       i32.store
       local.get $6
       if
        local.get $5
        local.get $6
        i32.const 0
        call $byn-split-outlined-A$~lib/rt/itcms/__link
       end
       global.get $~lib/memory/__stack_pointer
       global.get $logic/track-manager/trackPoints
       local.tee $6
       i32.store offset=4
       local.get $5
       local.get $6
       local.get $0
       call $~lib/array/Array<logic/geom-types/Point>#__get
       local.tee $6
       i32.store offset=4
       local.get $6
       if
        local.get $5
        local.get $6
        i32.const 0
        call $byn-split-outlined-A$~lib/rt/itcms/__link
       end
       local.get $1
       local.get $5
       i32.store offset=12
       i32.const 0
       local.set $1
       loop $for-loop|2
        global.get $~lib/memory/__stack_pointer
        global.get $logic/track-manager/blockingTrackLines
        local.tee $6
        i32.store offset=4
        local.get $6
        i32.load offset=12
        local.get $1
        i32.gt_s
        if
         block $for-break2
          global.get $~lib/memory/__stack_pointer
          global.get $logic/track-manager/blockingTrackLines
          local.tee $6
          i32.store offset=16
          local.get $6
          local.get $1
          call $~lib/array/Array<logic/geom-types/Point>#__get
          local.set $6
          global.get $~lib/memory/__stack_pointer
          local.get $6
          i32.store offset=16
          local.get $5
          local.get $6
          call $logic/geom-utils/checkIntersection<logic/geom-types/Line,logic/geom-types/Line>
          if
           i32.const 1
           local.set $4
           br $for-break2
          end
          local.get $1
          i32.const 1
          i32.add
          local.set $1
          br $for-loop|2
         end
        end
       end
       local.get $4
       i32.eqz
       if
        global.get $~lib/memory/__stack_pointer
        local.tee $1
        global.get $logic/track-manager/permanentObstaclesGraph
        local.tee $4
        i32.store offset=4
        local.get $1
        local.get $5
        i32.load
        local.tee $6
        i32.store offset=16
        local.get $1
        local.get $5
        i32.load offset=4
        local.tee $1
        i32.store offset=20
        local.get $4
        local.get $6
        local.get $1
        call $logic/track-manager/insertLinesToGraph
        global.get $~lib/memory/__stack_pointer
        global.get $logic/track-manager/permanentObstaclesGraph
        local.tee $1
        i32.store offset=4
        global.get $~lib/memory/__stack_pointer
        local.get $5
        i32.load offset=4
        local.tee $4
        i32.store offset=16
        global.get $~lib/memory/__stack_pointer
        local.get $5
        i32.load
        local.tee $5
        i32.store offset=20
        local.get $1
        local.get $4
        local.get $5
        call $logic/track-manager/insertLinesToGraph
       end
       local.get $0
       i32.const 1
       i32.add
       local.set $0
       br $for-loop|1
      end
     end
     local.get $3
     i32.const 1
     i32.add
     local.set $3
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 24
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $~lib/array/Array<logic/geom-types/Line>#map<~lib/array/Array<f32>> (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $3
  i64.const 0
  i64.store
  local.get $3
  i32.const 0
  i32.store offset=8
  local.get $3
  local.get $0
  i32.load offset=12
  local.tee $3
  i32.const 47
  i32.const 0
  call $~lib/rt/__newArray
  local.tee $7
  i32.store
  local.get $7
  i32.load offset=4
  local.set $4
  loop $for-loop|0
   local.get $3
   local.get $0
   i32.load offset=12
   local.tee $5
   local.get $3
   local.get $5
   i32.lt_s
   select
   local.get $2
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.tee $8
    local.get $2
    i32.const 2
    i32.shl
    local.tee $5
    local.get $0
    i32.load offset=4
    i32.add
    i32.load
    local.tee $6
    i32.store offset=4
    local.get $8
    local.get $6
    local.get $2
    local.get $0
    local.get $1
    i32.load
    call_indirect $0 (type $i32_i32_i32_=>_i32)
    local.tee $6
    i32.store offset=8
    local.get $4
    local.get $5
    i32.add
    local.get $6
    i32.store
    local.get $6
    if
     local.get $7
     local.get $6
     i32.const 1
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $7
 )
 (func $logic/index/debugObstacles~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  i64.const 0
  i64.store offset=8
  block $folding-inner0
   local.get $0
   i32.eqz
   if
    i32.const 1
    i32.const 46
    i32.const 3024
    call $~lib/rt/__newArray
    local.set $0
    br $folding-inner0
   end
   local.get $0
   i32.load offset=12
   i32.eqz
   if
    i32.const 1
    i32.const 46
    i32.const 3056
    call $~lib/rt/__newArray
    local.set $0
    br $folding-inner0
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 3088
   i32.store offset=12
   local.get $0
   i32.const 3088
   call $~lib/array/Array<logic/geom-types/Line>#map<~lib/array/Array<f32>>
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=8
   local.get $0
   call $~lib/array/Array<~lib/array/Array<f32>>#flat
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   i32.const 1
   i32.const 46
   i32.const 3120
   call $~lib/rt/__newArray
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $1
   call $~lib/array/Array<f32>#concat
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $logic/index/debugObstacles (result i32)
  (local $0 i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $0
  i64.const 0
  i64.store
  local.get $0
  i64.const 0
  i64.store offset=8
  local.get $0
  global.get $logic/obstacles-manager/outerBoundaries
  local.tee $1
  i32.store offset=4
  local.get $0
  i32.const 3152
  i32.store offset=8
  local.get $1
  i32.const 3152
  call $~lib/array/Array<logic/geom-types/Line>#map<~lib/array/Array<f32>>
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $0
  local.get $1
  call $~lib/array/Array<~lib/array/Array<f32>>#flat
  local.tee $0
  i32.store offset=12
  local.get $0
  call $logic/index/toFloat32Array
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/index/debugOuterTrack (result i32)
  (local $0 i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $0
  i64.const 0
  i64.store
  local.get $0
  i64.const 0
  i64.store offset=8
  local.get $0
  global.get $logic/track-manager/blockingTrackLines
  local.tee $1
  i32.store offset=4
  local.get $0
  i32.const 3184
  i32.store offset=8
  local.get $1
  i32.const 3184
  call $~lib/array/Array<logic/geom-types/Line>#map<~lib/array/Array<f32>>
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $0
  local.get $1
  call $~lib/array/Array<~lib/array/Array<f32>>#flat
  local.tee $0
  i32.store offset=12
  local.get $0
  call $logic/index/toFloat32Array
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/index/debugInnerTrack (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 f32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 32
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $0
   i64.const 0
   i64.store
   local.get $0
   i64.const 0
   i64.store offset=8
   local.get $0
   i64.const 0
   i64.store offset=16
   local.get $0
   i64.const 0
   i64.store offset=24
   local.get $0
   i32.const 0
   i32.const 46
   i32.const 3216
   call $~lib/rt/__newArray
   local.tee $3
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $logic/track-manager/permanentObstaclesGraph
   local.tee $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   call $~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#keys
   local.tee $4
   i32.store offset=8
   loop $for-loop|0
    local.get $4
    i32.load offset=12
    local.get $2
    i32.gt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $4
     local.get $2
     call $~lib/array/Array<u32>#__get
     local.set $6
     global.get $~lib/memory/__stack_pointer
     i32.const 8
     i32.sub
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 6788
     i32.lt_s
     br_if $folding-inner0
     global.get $~lib/memory/__stack_pointer
     i64.const 0
     i64.store
     i32.const 0
     local.set $0
     block $__inlined_func$logic/index/getPointCoordsById
      loop $for-loop|02
       global.get $~lib/memory/__stack_pointer
       global.get $logic/track-manager/trackPoints
       local.tee $7
       i32.store
       local.get $7
       i32.load offset=12
       local.get $0
       i32.gt_s
       if
        global.get $~lib/memory/__stack_pointer
        global.get $logic/track-manager/trackPoints
        local.tee $7
        i32.store
        local.get $6
        local.get $7
        local.get $0
        call $~lib/array/Array<logic/geom-types/Point>#__get
        i32.load offset=8
        i32.eq
        if
         global.get $~lib/memory/__stack_pointer
         global.get $logic/track-manager/trackPoints
         local.tee $6
         i32.store
         local.get $6
         local.get $0
         call $~lib/array/Array<logic/geom-types/Point>#__get
         local.set $0
         br $__inlined_func$logic/index/getPointCoordsById
        end
        local.get $0
        i32.const 1
        i32.add
        local.set $0
        br $for-loop|02
       end
      end
      global.get $~lib/memory/__stack_pointer
      call $logic/geom-types/UniquePoint#constructor
      local.tee $0
      i32.store offset=4
      local.get $0
      i32.const 0
      i32.store offset=8
      local.get $0
      f32.const 0
      f32.store
      local.get $0
      f32.const 0
      f32.store offset=4
     end
     global.get $~lib/memory/__stack_pointer
     i32.const 8
     i32.add
     global.set $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=12
     global.get $~lib/memory/__stack_pointer
     local.tee $1
     global.get $logic/track-manager/permanentObstaclesGraph
     local.tee $6
     i32.store offset=4
     local.get $1
     local.get $6
     local.get $4
     local.get $2
     call $~lib/array/Array<u32>#__get
     call $~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#get
     local.tee $7
     i32.store offset=16
     i32.const 0
     local.set $1
     loop $for-loop|1
      local.get $7
      i32.load offset=12
      local.get $1
      i32.gt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.tee $8
       i32.const 5
       i32.const 46
       i32.const 0
       call $~lib/rt/__newArray
       local.tee $6
       i32.store offset=24
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.load offset=4
       i32.store offset=28
       local.get $6
       i32.load offset=4
       local.get $0
       f32.load
       f32.store
       local.get $6
       i32.load offset=4
       local.get $0
       f32.load offset=4
       f32.store offset=4
       local.get $7
       local.get $1
       call $~lib/array/Array<logic/geom-types/Point>#__get
       f32.load
       local.set $5
       local.get $6
       i32.load offset=4
       local.get $5
       f32.store offset=8
       local.get $7
       local.get $1
       call $~lib/array/Array<logic/geom-types/Point>#__get
       f32.load offset=4
       local.set $5
       local.get $6
       i32.load offset=4
       local.get $5
       f32.store offset=12
       local.get $6
       i32.load offset=4
       f32.const -1
       f32.store offset=16
       global.get $~lib/memory/__stack_pointer
       local.get $6
       i32.store offset=20
       local.get $8
       local.get $3
       local.get $6
       call $~lib/array/Array<f32>#concat
       local.tee $3
       i32.store
       local.get $1
       i32.const 1
       i32.add
       local.set $1
       br $for-loop|1
      end
     end
     local.get $2
     i32.const 1
     i32.add
     local.set $2
     br $for-loop|0
    end
   end
   local.get $3
   call $logic/index/toFloat32Array
   global.get $~lib/memory/__stack_pointer
   i32.const 32
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/index/getFactoriesInitData (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  i64.const 0
  i64.store offset=8
  local.get $1
  i32.const 2528
  i32.store
  local.get $1
  i32.const 2540
  i32.load
  i32.const 5
  i32.mul
  call $~lib/typedarray/Float32Array#constructor
  local.tee $2
  i32.store offset=4
  loop $for-loop|0
   global.get $~lib/memory/__stack_pointer
   i32.const 2528
   i32.store
   i32.const 2540
   i32.load
   local.get $0
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.tee $1
    i32.const 2528
    i32.store
    local.get $1
    i32.const 2528
    local.get $0
    call $~lib/array/Array<logic/geom-types/Point>#__get
    local.tee $3
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.load
    local.tee $1
    f32.load offset=24
    local.get $1
    f32.load offset=28
    call $logic/convert-coords-between-logic-and-visual/convertLogicCoordsToVisual
    local.tee $4
    i32.store offset=12
    local.get $2
    local.get $0
    i32.const 5
    i32.mul
    local.tee $1
    local.get $3
    i32.load offset=16
    f32.convert_i32_s
    call $~lib/typedarray/Float32Array#__set
    local.get $2
    local.get $1
    i32.const 1
    i32.add
    local.get $3
    i32.load
    f32.load offset=16
    call $~lib/typedarray/Float32Array#__set
    local.get $2
    local.get $1
    i32.const 2
    i32.add
    local.get $4
    f32.load
    call $~lib/typedarray/Float32Array#__set
    local.get $2
    local.get $1
    i32.const 3
    i32.add
    local.get $4
    f32.load offset=4
    call $~lib/typedarray/Float32Array#__set
    local.get $2
    local.get $1
    i32.const 4
    i32.add
    local.get $3
    i32.load
    f32.load offset=32
    f32.const -0.6499999761581421
    f32.add
    call $~lib/typedarray/Float32Array#__set
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $logic/index/debugGrid (result i32)
  (local $0 i32)
  (local $1 f32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $0
   i32.const 0
   i32.store
   local.get $0
   i32.const 20
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $0
   i64.const 0
   i64.store
   local.get $0
   i64.const 0
   i64.store offset=8
   local.get $0
   i32.const 0
   i32.store offset=16
   local.get $0
   i32.const 0
   i32.const 46
   i32.const 3248
   call $~lib/rt/__newArray
   local.tee $0
   i32.store
   loop $for-loop|0
    global.get $logic/squads-grid-manager/gridMapWidth_f32
    local.get $1
    f32.gt
    if
     local.get $0
     local.get $1
     global.get $logic/squads-grid-manager/gridMapScaleX
     f32.div
     call $~lib/array/Array<f32>#push
     local.get $0
     f32.const 0
     call $~lib/array/Array<f32>#push
     local.get $0
     local.get $1
     global.get $logic/squads-grid-manager/gridMapScaleX
     f32.div
     call $~lib/array/Array<f32>#push
     local.get $0
     global.get $logic/squads-grid-manager/gridMapHeight_f32
     global.get $logic/squads-grid-manager/gridMapScaleY
     f32.div
     call $~lib/array/Array<f32>#push
     local.get $1
     f32.const 1
     f32.add
     local.set $1
     br $for-loop|0
    end
   end
   f32.const 0
   local.set $1
   loop $for-loop|1
    global.get $logic/squads-grid-manager/gridMapHeight_f32
    local.get $1
    f32.gt
    if
     local.get $0
     f32.const 0
     call $~lib/array/Array<f32>#push
     local.get $0
     local.get $1
     global.get $logic/squads-grid-manager/gridMapScaleY
     f32.div
     call $~lib/array/Array<f32>#push
     local.get $0
     global.get $logic/squads-grid-manager/gridMapWidth_f32
     global.get $logic/squads-grid-manager/gridMapScaleX
     f32.div
     call $~lib/array/Array<f32>#push
     local.get $0
     local.get $1
     global.get $logic/squads-grid-manager/gridMapScaleY
     f32.div
     call $~lib/array/Array<f32>#push
     local.get $1
     f32.const 1
     f32.add
     local.set $1
     br $for-loop|1
    end
   end
   local.get $0
   f32.const -1
   call $~lib/array/Array<f32>#push
   global.get $~lib/memory/__stack_pointer
   local.tee $2
   global.get $logic/squads-grid-manager/grid
   local.tee $3
   i32.store offset=8
   local.get $2
   i32.const 3280
   i32.store offset=12
   local.get $3
   i32.const 3280
   call $~lib/array/Array<logic/geom-types/Line>#map<~lib/array/Array<f32>>
   local.set $3
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=4
   local.get $2
   local.get $3
   call $~lib/array/Array<~lib/array/Array<f32>>#flat
   local.tee $2
   i32.store offset=16
   local.get $0
   local.get $2
   call $~lib/array/Array<f32>#concat
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 20
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   call $logic/index/toFloat32Array
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $~lib/array/Array<logic/squad/Squad>#forEach (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.load offset=12
  local.set $3
  loop $for-loop|0
   local.get $3
   local.get $0
   i32.load offset=12
   local.tee $4
   local.get $3
   local.get $4
   i32.lt_s
   select
   local.get $2
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=4
    local.get $2
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $4
    i32.store
    local.get $4
    local.get $2
    local.get $0
    local.get $1
    i32.load
    call_indirect $0 (type $i32_i32_i32_=>_none)
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/index/updateUniverse~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  local.get $0
  i32.load offset=4
  local.tee $0
  i32.store
  local.get $1
  i32.const 3312
  i32.store offset=4
  local.get $0
  i32.const 3312
  call $~lib/array/Array<logic/squad/Squad>#forEach
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/hex-positions/getSquadPositions (param $0 i32) (param $1 f32) (param $2 f32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 f32)
  (local $7 f32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $3
  i64.const 0
  i64.store
  local.get $3
  i64.const 0
  i64.store offset=8
  local.get $3
  i64.const 0
  i64.store offset=16
  local.get $3
  i32.const 0
  i32.const 32
  i32.const 3440
  call $~lib/rt/__newArray
  local.tee $4
  i32.store
  loop $for-loop|0
   global.get $~lib/memory/__stack_pointer
   global.get $logic/hex-positions/HEX_POSITIONS
   local.tee $3
   i32.store offset=4
   local.get $3
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 2
   i32.shr_u
   local.get $5
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.tee $3
    global.get $logic/hex-positions/HEX_POSITIONS
    local.tee $8
    i32.store offset=4
    local.get $3
    local.get $8
    local.get $5
    call $~lib/staticarray/StaticArray<~lib/staticarray/StaticArray<logic/geom-types/Point>>#__get
    local.tee $8
    i32.store offset=8
    i32.const 0
    local.set $3
    loop $for-loop|1
     local.get $8
     i32.const 20
     i32.sub
     i32.load offset=16
     i32.const 2
     i32.shr_u
     local.get $3
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $8
      local.get $3
      call $~lib/staticarray/StaticArray<~lib/staticarray/StaticArray<logic/geom-types/Point>>#__get
      local.tee $9
      i32.store offset=12
      local.get $9
      f32.load
      local.get $1
      f32.add
      local.tee $6
      local.get $9
      f32.load offset=4
      local.get $2
      f32.add
      local.tee $7
      i32.const 1
      call $logic/obstacles-manager/getIsPointAvailable
      if
       global.get $~lib/memory/__stack_pointer
       i32.const 0
       call $logic/geom-types/Point#constructor
       local.tee $9
       i32.store offset=20
       local.get $9
       local.get $6
       f32.store
       local.get $9
       local.get $7
       f32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $9
       i32.store offset=16
       local.get $4
       local.get $9
       call $~lib/array/Array<logic/geom-types/Point>#push
      end
      local.get $4
      i32.load offset=12
      local.get $0
      i32.eq
      if
       global.get $~lib/memory/__stack_pointer
       i32.const 24
       i32.add
       global.set $~lib/memory/__stack_pointer
       local.get $4
       return
      end
      local.get $3
      i32.const 1
      i32.add
      local.set $3
      br $for-loop|1
     end
    end
    global.get $~lib/memory/__stack_pointer
    global.get $logic/hex-positions/HEX_POSITIONS
    local.tee $3
    i32.store offset=4
    local.get $5
    i32.const 1
    i32.add
    local.get $3
    i32.const 20
    i32.sub
    i32.load offset=16
    i32.const 2
    i32.shr_u
    i32.rem_s
    local.set $5
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $4
 )
 (func $logic/squad/Squad#resetState (param $0 i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  local.get $0
  i32.const 0
  i32.store offset=28
  local.get $0
  i32.const 0
  i32.store offset=20
  local.get $0
  i32.const 0
  i32.const 19
  i32.const 3472
  call $~lib/rt/__newArray
  local.tee $1
  i32.store offset=32
  local.get $1
  if
   local.get $0
   local.get $1
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  local.get $0
  i32.load offset=16
  local.tee $0
  i32.store
  local.get $1
  i32.const 3504
  i32.store offset=4
  local.get $0
  i32.const 3504
  call $~lib/array/Array<logic/squad/Squad>#forEach
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/get-initial-track-index/getInitialTrackIndex (param $0 i32) (param $1 f32) (param $2 f32) (param $3 i32) (result i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 255
  i32.and
  i32.eqz
  local.get $1
  local.get $3
  i32.load offset=36
  local.tee $4
  f32.load
  f32.sub
  local.get $2
  local.get $4
  f32.load offset=4
  f32.sub
  call $~lib/math/NativeMathf.hypot
  f32.const 72
  f32.lt
  i32.and
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1
   local.set $0
  else
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.load offset=32
   local.tee $3
   i32.store
   local.get $3
   i32.load offset=12
   i32.const 255
   i32.and
   local.get $0
   i32.const 1
   i32.add
   i32.const 255
   i32.and
   i32.ne
   if
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $0
    i32.const 1
    i32.add
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
  end
  local.get $0
 )
 (func $logic/squad/Squad#fixSquadCenter (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   i64.const 0
   i64.store
   local.get $1
   i64.const 0
   i64.store offset=8
   local.get $0
   i32.load8_u offset=6
   i32.eqz
   if
    local.get $0
    i32.const 1
    i32.store8 offset=6
    global.get $~lib/memory/__stack_pointer
    call $logic/squad/TaskTodo#constructor
    local.tee $1
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=32
    local.tee $2
    i32.store offset=4
    local.get $1
    local.get $2
    i32.load offset=12
    i32.const 0
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.tee $2
     local.get $0
     i32.load offset=32
     local.tee $3
     i32.store offset=4
     local.get $2
     local.get $0
     i32.load offset=32
     local.tee $2
     i32.store offset=8
     local.get $3
     i32.load offset=4
     local.get $2
     i32.load offset=12
     i32.const 1
     i32.sub
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 0
    end
    local.tee $2
    i32.store
    local.get $2
    if
     local.get $1
     local.get $2
     i32.const 0
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    local.get $1
    local.get $0
    i32.load offset=20
    local.tee $2
    i32.store offset=4
    local.get $2
    if
     local.get $1
     local.get $2
     i32.const 0
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    local.get $1
    local.get $0
    i32.load offset=28
    local.tee $2
    i32.store offset=8
    local.get $2
    if
     local.get $1
     local.get $2
     i32.const 0
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    local.get $0
    local.get $1
    i32.store offset=8
    local.get $1
    if
     local.get $0
     local.get $1
     i32.const 0
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 1
   local.get $0
   i32.load offset=36
   local.tee $2
   f32.load
   local.get $2
   f32.load offset=4
   call $logic/hex-positions/getSquadPositions
   local.set $2
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=4
   local.get $2
   i32.load offset=4
   i32.load
   local.tee $2
   i32.store offset=12
   local.get $0
   call $logic/squad/Squad#resetState
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load offset=36
   local.tee $3
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   i64.const 0
   i64.store
   local.get $1
   i64.const 0
   i64.store offset=8
   local.get $1
   i32.const 2
   i32.const 19
   i32.const 0
   call $~lib/rt/__newArray
   local.tee $4
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.load offset=4
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   call $logic/geom-types/UniquePoint#constructor
   local.tee $1
   i32.store offset=8
   local.get $1
   i32.const 0
   i32.store offset=8
   local.get $1
   local.get $3
   f32.load
   f32.store
   local.get $1
   local.get $3
   f32.load offset=4
   f32.store offset=4
   local.get $4
   i32.const 0
   local.get $1
   call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
   global.get $~lib/memory/__stack_pointer
   call $logic/geom-types/UniquePoint#constructor
   local.tee $1
   i32.store offset=12
   local.get $1
   i32.const 1
   i32.store offset=8
   local.get $1
   local.get $2
   f32.load
   f32.store
   local.get $1
   local.get $2
   f32.load offset=4
   f32.store offset=4
   local.get $4
   i32.const 1
   local.get $1
   call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   local.get $4
   i32.store offset=32
   local.get $4
   if
    local.get $0
    local.get $4
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.load offset=16
   local.tee $0
   i32.store offset=4
   local.get $1
   i32.const 3536
   i32.store offset=8
   local.get $0
   i32.const 3536
   call $~lib/array/Array<logic/squad/Squad>#forEach
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/track-manager/addNewPointToGraph (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 32
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $3
  i64.const 0
  i64.store
  local.get $3
  i64.const 0
  i64.store offset=8
  local.get $3
  i64.const 0
  i64.store offset=16
  local.get $3
  i64.const 0
  i64.store offset=24
  loop $for-loop|0
   global.get $~lib/memory/__stack_pointer
   global.get $logic/track-manager/trackPoints
   local.tee $3
   i32.store
   local.get $3
   i32.load offset=12
   local.get $5
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.tee $3
    global.get $logic/track-manager/trackPoints
    local.tee $4
    i32.store
    local.get $3
    local.get $4
    local.get $5
    call $~lib/array/Array<logic/geom-types/Point>#__get
    local.tee $9
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    call $logic/geom-types/UniqueLine#constructor
    local.tee $7
    i32.store offset=8
    local.get $7
    local.get $1
    i32.store
    local.get $1
    if
     local.get $7
     local.get $1
     i32.const 0
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    local.get $7
    local.get $9
    i32.store offset=4
    local.get $9
    if
     local.get $7
     local.get $9
     i32.const 0
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    local.get $7
    i32.store offset=12
    i32.const 0
    local.set $3
    i32.const 0
    local.set $4
    loop $for-loop|1
     global.get $~lib/memory/__stack_pointer
     global.get $logic/track-manager/blockingTrackLines
     local.tee $8
     i32.store
     local.get $8
     i32.load offset=12
     local.get $4
     i32.gt_s
     if
      block $for-break1
       global.get $~lib/memory/__stack_pointer
       local.tee $8
       global.get $logic/track-manager/blockingTrackLines
       local.tee $10
       i32.store
       local.get $8
       local.get $10
       i32.load offset=4
       local.get $4
       i32.const 2
       i32.shl
       i32.add
       i32.load
       local.tee $8
       i32.store offset=16
       local.get $7
       local.get $8
       call $logic/geom-utils/checkIntersection<logic/geom-types/Line,logic/geom-types/Line>
       if
        i32.const 1
        local.set $3
        br $for-break1
       end
       local.get $4
       i32.const 1
       i32.add
       local.set $4
       br $for-loop|1
      end
     end
    end
    local.get $3
    i32.eqz
    if
     i32.const 1
     local.set $6
     local.get $1
     local.get $9
     local.get $2
     select
     i32.load offset=8
     local.set $3
     global.get $~lib/memory/__stack_pointer
     local.get $9
     local.get $1
     local.get $2
     select
     local.tee $7
     i32.store offset=20
     local.get $0
     i32.load
     local.get $0
     i32.load offset=4
     local.get $3
     i32.const -1028477379
     i32.mul
     i32.const 374761397
     i32.add
     i32.const 17
     i32.rotl
     i32.const 668265263
     i32.mul
     local.tee $4
     local.get $4
     i32.const 15
     i32.shr_u
     i32.xor
     i32.const -2048144777
     i32.mul
     local.tee $4
     local.get $4
     i32.const 13
     i32.shr_u
     i32.xor
     i32.const -1028477379
     i32.mul
     local.tee $4
     local.get $4
     i32.const 16
     i32.shr_u
     i32.xor
     i32.and
     i32.const 2
     i32.shl
     i32.add
     i32.load
     local.set $4
     block $__inlined_func$~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#find
      loop $while-continue|0
       local.get $4
       if
        local.get $4
        i32.load offset=8
        local.tee $8
        i32.const 1
        i32.and
        if (result i32)
         i32.const 0
        else
         local.get $3
         local.get $4
         i32.load
         i32.eq
        end
        br_if $__inlined_func$~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#find
        local.get $8
        i32.const -2
        i32.and
        local.set $4
        br $while-continue|0
       end
      end
      i32.const 0
      local.set $4
     end
     local.get $4
     if
      local.get $0
      local.get $3
      call $~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#get
      local.set $3
      global.get $~lib/memory/__stack_pointer
      local.get $3
      i32.store
      local.get $3
      local.get $7
      call $~lib/array/Array<logic/geom-types/Point>#push
     else
      global.get $~lib/memory/__stack_pointer
      i32.const 1
      i32.const 19
      i32.const 0
      call $~lib/rt/__newArray
      local.tee $4
      i32.store offset=16
      global.get $~lib/memory/__stack_pointer
      local.get $4
      i32.load offset=4
      i32.store offset=28
      local.get $4
      i32.const 0
      local.get $7
      call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
      global.get $~lib/memory/__stack_pointer
      local.get $4
      i32.store offset=24
      local.get $0
      local.get $3
      local.get $4
      call $~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#set
     end
    end
    local.get $5
    i32.const 1
    i32.add
    local.set $5
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 32
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $6
 )
 (func $logic/track-manager/shortestPathAStart (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 f32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 f32)
  (local $15 i32)
  (local $16 i32)
  (local $17 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 56
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $4
   i64.const 0
   i64.store
   local.get $4
   i64.const 0
   i64.store offset=8
   local.get $4
   i64.const 0
   i64.store offset=16
   local.get $4
   i64.const 0
   i64.store offset=24
   local.get $4
   i64.const 0
   i64.store offset=32
   local.get $4
   i64.const 0
   i64.store offset=40
   local.get $4
   i64.const 0
   i64.store offset=48
   local.get $4
   i32.const 1
   i32.const 57
   i32.const 0
   call $~lib/rt/__newArray
   local.tee $3
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.load offset=4
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   call $logic/track-manager/QueueItem#constructor
   local.tee $5
   i32.store offset=8
   local.get $5
   local.get $1
   i32.store
   local.get $1
   if
    local.get $5
    local.get $1
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 1
   i32.const 19
   i32.const 0
   call $~lib/rt/__newArray
   local.tee $6
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   local.get $6
   i32.load offset=4
   i32.store offset=16
   local.get $6
   i32.const 0
   local.get $1
   call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
   local.get $5
   local.get $6
   i32.store offset=4
   local.get $6
   if
    local.get $5
    local.get $6
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   local.get $5
   f32.const 0
   f32.store offset=8
   local.get $5
   f32.const 0
   f32.store offset=12
   local.get $3
   i32.const 0
   local.get $5
   call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
   local.get $4
   local.get $3
   local.tee $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 50
   i32.const 3728
   call $~lib/rt/__newArray
   local.tee $8
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 19
   i32.const 3760
   call $~lib/rt/__newArray
   local.tee $9
   i32.store offset=12
   loop $while-continue|0
    local.get $1
    i32.load offset=12
    i32.const 0
    i32.gt_s
    if
     block $while-break|0
      global.get $~lib/memory/__stack_pointer
      local.tee $3
      i32.const 4
      i32.sub
      global.set $~lib/memory/__stack_pointer
      global.get $~lib/memory/__stack_pointer
      i32.const 6788
      i32.lt_s
      br_if $folding-inner0
      global.get $~lib/memory/__stack_pointer
      i32.const 0
      i32.store
      local.get $1
      i32.load offset=12
      local.tee $4
      i32.const 0
      i32.le_s
      if
       i32.const 3792
       i32.const 1632
       i32.const 291
       i32.const 18
       call $~lib/builtins/abort
       unreachable
      end
      global.get $~lib/memory/__stack_pointer
      local.tee $5
      local.get $1
      i32.load offset=4
      local.get $4
      i32.const 1
      i32.sub
      local.tee $4
      i32.const 2
      i32.shl
      i32.add
      i32.load
      local.tee $11
      i32.store
      local.get $1
      local.get $4
      i32.store offset=12
      local.get $5
      i32.const 4
      i32.add
      global.set $~lib/memory/__stack_pointer
      local.get $3
      local.get $11
      i32.store offset=20
      i32.const 0
      local.set $4
      global.get $~lib/memory/__stack_pointer
      local.get $0
      local.get $11
      i32.load
      i32.load offset=8
      call $~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#get
      local.tee $7
      i32.store offset=24
      i32.const 0
      local.set $6
      loop $for-loop|1
       local.get $7
       i32.load offset=12
       local.get $6
       i32.gt_s
       if
        block $for-break1
         local.get $7
         local.get $6
         call $~lib/array/Array<logic/geom-types/Point>#__get
         i32.load offset=8
         local.get $2
         i32.load offset=8
         i32.eq
         if
          i32.const 1
          local.set $4
          br $for-break1
         end
         local.get $6
         i32.const 1
         i32.add
         local.set $6
         br $for-loop|1
        end
       end
      end
      local.get $4
      if
       global.get $~lib/memory/__stack_pointer
       local.tee $0
       local.get $11
       i32.load offset=4
       local.tee $1
       i32.store offset=28
       local.get $0
       local.get $1
       call $~lib/array/Array<logic/geom-types/UniquePoint>#slice
       local.tee $9
       i32.store offset=12
       local.get $9
       local.get $2
       call $~lib/array/Array<logic/geom-types/Point>#push
       br $while-break|0
      end
      local.get $8
      local.get $11
      i32.load
      i32.load offset=8
      call $~lib/array/Array<u32>#push
      i32.const 0
      local.set $6
      loop $for-loop|2
       local.get $7
       i32.load offset=12
       local.get $6
       i32.gt_s
       if
        global.get $~lib/memory/__stack_pointer
        local.get $7
        local.get $6
        call $~lib/array/Array<logic/geom-types/Point>#__get
        local.tee $12
        i32.store offset=32
        block $__inlined_func$~lib/array/Array<u32>#indexOf (result i32)
         local.get $12
         i32.load offset=8
         local.set $4
         i32.const 0
         local.set $3
         i32.const -1
         local.get $8
         i32.load offset=12
         local.tee $5
         i32.const 0
         i32.le_s
         i32.const 1
         local.get $5
         select
         br_if $__inlined_func$~lib/array/Array<u32>#indexOf
         drop
         local.get $8
         i32.load offset=4
         local.set $13
         loop $while-continue|02
          local.get $3
          local.get $5
          i32.lt_s
          if
           local.get $3
           local.get $4
           local.get $3
           i32.const 2
           i32.shl
           local.get $13
           i32.add
           i32.load
           i32.eq
           br_if $__inlined_func$~lib/array/Array<u32>#indexOf
           drop
           local.get $3
           i32.const 1
           i32.add
           local.set $3
           br $while-continue|02
          end
         end
         i32.const -1
        end
        i32.const 0
        i32.lt_s
        if
         local.get $12
         f32.load
         local.get $11
         i32.load
         local.tee $3
         f32.load
         f32.sub
         local.get $12
         f32.load offset=4
         local.get $3
         f32.load offset=4
         f32.sub
         call $~lib/math/NativeMathf.hypot
         local.set $10
         local.get $11
         f32.load offset=8
         local.get $10
         f32.add
         local.tee $10
         local.get $12
         f32.load
         local.get $2
         f32.load
         f32.sub
         local.get $12
         f32.load offset=4
         local.get $2
         f32.load offset=4
         f32.sub
         call $~lib/math/NativeMathf.hypot
         f32.add
         local.set $14
         i32.const 0
         local.set $5
         local.get $1
         i32.load offset=12
         local.set $3
         loop $while-continue|05
          local.get $3
          local.get $5
          i32.gt_s
          if
           local.get $14
           local.get $1
           local.get $3
           local.get $5
           i32.add
           i32.const 1
           i32.shr_s
           local.tee $4
           call $~lib/array/Array<logic/geom-types/Point>#__get
           f32.load offset=12
           f32.lt
           if
            local.get $4
            i32.const 1
            i32.add
            local.set $5
           else
            local.get $4
            local.set $3
           end
           br $while-continue|05
          end
         end
         global.get $~lib/memory/__stack_pointer
         local.tee $3
         local.get $11
         i32.load offset=4
         local.tee $4
         i32.store offset=28
         local.get $3
         local.get $4
         call $~lib/array/Array<logic/geom-types/UniquePoint>#slice
         local.tee $3
         i32.store offset=36
         local.get $3
         local.get $12
         call $~lib/array/Array<logic/geom-types/Point>#push
         global.get $~lib/memory/__stack_pointer
         global.get $~lib/memory/__stack_pointer
         call $logic/track-manager/QueueItem#constructor
         local.tee $13
         i32.store offset=40
         local.get $13
         local.get $12
         i32.store
         local.get $12
         if
          local.get $13
          local.get $12
          i32.const 0
          call $byn-split-outlined-A$~lib/rt/itcms/__link
         end
         local.get $13
         local.get $3
         i32.store offset=4
         local.get $3
         if
          local.get $13
          local.get $3
          i32.const 0
          call $byn-split-outlined-A$~lib/rt/itcms/__link
         end
         local.get $13
         local.get $10
         f32.store offset=8
         local.get $13
         local.get $14
         f32.store offset=12
         local.get $13
         i32.store offset=44
         global.get $~lib/memory/__stack_pointer
         local.get $1
         i32.const 0
         local.get $5
         call $~lib/array/Array<logic/track-manager/QueueItem>#slice
         local.tee $12
         i32.store offset=48
         local.get $12
         local.get $13
         call $~lib/array/Array<logic/geom-types/Point>#push
         global.get $~lib/memory/__stack_pointer
         local.get $1
         local.get $5
         i32.const 2147483647
         call $~lib/array/Array<logic/track-manager/QueueItem>#slice
         local.set $15
         global.get $~lib/memory/__stack_pointer
         local.get $15
         i32.store offset=52
         global.get $~lib/memory/__stack_pointer
         i32.const 4
         i32.sub
         global.set $~lib/memory/__stack_pointer
         global.get $~lib/memory/__stack_pointer
         i32.const 6788
         i32.lt_s
         br_if $folding-inner0
         global.get $~lib/memory/__stack_pointer
         i32.const 0
         i32.store
         local.get $12
         i32.load offset=12
         local.tee $1
         local.get $15
         i32.load offset=12
         i32.const 0
         local.get $15
         select
         local.tee $4
         i32.add
         local.tee $3
         i32.const 268435455
         i32.gt_u
         if
          i32.const 1056
          i32.const 1632
          i32.const 244
          i32.const 60
          call $~lib/builtins/abort
          unreachable
         end
         global.get $~lib/memory/__stack_pointer
         local.get $3
         i32.const 57
         i32.const 0
         call $~lib/rt/__newArray
         local.tee $3
         i32.store
         local.get $3
         i32.load offset=4
         local.set $5
         local.get $1
         i32.const 2
         i32.shl
         local.set $16
         local.get $12
         i32.load offset=4
         local.set $12
         i32.const 0
         local.set $1
         loop $for-loop|0
          local.get $1
          local.get $16
          i32.lt_u
          if
           local.get $1
           local.get $5
           i32.add
           local.get $1
           local.get $12
           i32.add
           i32.load
           local.tee $17
           i32.store
           local.get $17
           if
            local.get $3
            local.get $17
            i32.const 1
            call $byn-split-outlined-A$~lib/rt/itcms/__link
           end
           local.get $1
           i32.const 4
           i32.add
           local.set $1
           br $for-loop|0
          end
         end
         local.get $5
         local.get $16
         i32.add
         local.set $1
         local.get $15
         i32.load offset=4
         local.set $5
         local.get $4
         i32.const 2
         i32.shl
         local.set $12
         i32.const 0
         local.set $4
         loop $for-loop|17
          local.get $4
          local.get $12
          i32.lt_u
          if
           local.get $1
           local.get $4
           i32.add
           local.get $4
           local.get $5
           i32.add
           i32.load
           local.tee $15
           i32.store
           local.get $15
           if
            local.get $3
            local.get $15
            i32.const 1
            call $byn-split-outlined-A$~lib/rt/itcms/__link
           end
           local.get $4
           i32.const 4
           i32.add
           local.set $4
           br $for-loop|17
          end
         end
         global.get $~lib/memory/__stack_pointer
         i32.const 4
         i32.add
         global.set $~lib/memory/__stack_pointer
         local.get $3
         local.tee $1
         i32.store offset=4
        end
        local.get $6
        i32.const 1
        i32.add
        local.set $6
        br $for-loop|2
       end
      end
      br $while-continue|0
     end
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 56
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $9
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/track-manager/getTrack (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 28
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $4
   i64.const 0
   i64.store
   local.get $4
   i64.const 0
   i64.store offset=8
   local.get $4
   i64.const 0
   i64.store offset=16
   local.get $4
   i32.const 0
   i32.store offset=24
   local.get $4
   call $logic/geom-types/UniquePoint#constructor
   local.tee $2
   i32.store
   local.get $2
   i32.const 0
   i32.store offset=8
   local.get $2
   local.get $0
   f32.load
   f32.store
   local.get $2
   local.get $0
   f32.load offset=4
   f32.store offset=4
   local.get $4
   local.get $2
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   call $logic/geom-types/UniquePoint#constructor
   local.tee $4
   i32.store offset=8
   local.get $4
   i32.const 1
   i32.store offset=8
   local.get $4
   local.get $1
   f32.load
   f32.store
   local.get $4
   local.get $1
   f32.load offset=4
   f32.store offset=4
   local.get $4
   i32.store offset=12
   block $__inlined_func$logic/track-manager/getIsDirectConnectionPossible (result i32)
    global.get $~lib/memory/__stack_pointer
    global.get $logic/track-manager/blockingTrackLines
    local.tee $5
    i32.store offset=16
    global.get $~lib/memory/__stack_pointer
    i32.const 12
    i32.sub
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    i32.const 6788
    i32.lt_s
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    local.tee $1
    i64.const 0
    i64.store
    local.get $1
    i32.const 0
    i32.store offset=8
    local.get $1
    call $logic/geom-types/UniqueLine#constructor
    local.tee $6
    i32.store
    local.get $6
    local.get $2
    local.tee $0
    i32.store
    local.get $2
    if
     local.get $6
     local.get $0
     i32.const 0
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    local.get $6
    local.get $4
    i32.store offset=4
    local.get $4
    if
     local.get $6
     local.get $4
     i32.const 0
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    local.get $1
    local.get $6
    i32.store offset=4
    i32.const 0
    local.set $1
    loop $for-loop|0
     local.get $5
     i32.load offset=12
     local.get $1
     i32.gt_s
     if
      local.get $5
      local.get $1
      call $~lib/array/Array<logic/geom-types/Point>#__get
      local.set $0
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      local.get $6
      local.get $0
      call $logic/geom-utils/checkIntersection<logic/geom-types/Line,logic/geom-types/Line>
      if
       global.get $~lib/memory/__stack_pointer
       i32.const 12
       i32.add
       global.set $~lib/memory/__stack_pointer
       i32.const 0
       br $__inlined_func$logic/track-manager/getIsDirectConnectionPossible
      end
      local.get $1
      i32.const 1
      i32.add
      local.set $1
      br $for-loop|0
     end
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 12
    i32.add
    global.set $~lib/memory/__stack_pointer
    i32.const 1
   end
   if
    global.get $~lib/memory/__stack_pointer
    i32.const 2
    i32.const 19
    i32.const 0
    call $~lib/rt/__newArray
    local.tee $0
    i32.store offset=20
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=4
    i32.store offset=24
    local.get $0
    i32.const 0
    local.get $2
    call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
    local.get $0
    i32.const 1
    local.get $4
    call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
    global.get $~lib/memory/__stack_pointer
    i32.const 28
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $0
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 20
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $0
   i64.const 0
   i64.store
   local.get $0
   i64.const 0
   i64.store offset=8
   local.get $0
   i32.const 0
   i32.store offset=16
   local.get $0
   call $~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#constructor
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $logic/track-manager/permanentObstaclesGraph
   local.tee $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $1
   call $~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#keys
   local.tee $1
   i32.store offset=8
   loop $for-loop|03
    local.get $1
    i32.load offset=12
    local.get $3
    i32.gt_s
    if
     local.get $1
     local.get $3
     call $~lib/array/Array<u32>#__get
     local.set $5
     global.get $~lib/memory/__stack_pointer
     global.get $logic/track-manager/permanentObstaclesGraph
     local.tee $6
     i32.store offset=12
     local.get $6
     local.get $5
     call $~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#get
     local.set $6
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.store offset=16
     local.get $6
     call $~lib/array/Array<logic/geom-types/UniquePoint>#slice
     local.set $6
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.store offset=12
     local.get $0
     local.get $5
     local.get $6
     call $~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#set
     local.get $3
     i32.const 1
     i32.add
     local.set $3
     br $for-loop|03
    end
   end
   local.get $0
   local.get $2
   i32.const 1
   call $logic/track-manager/addNewPointToGraph
   i32.eqz
   if
    global.get $~lib/memory/__stack_pointer
    i32.const 3568
    i32.store offset=4
    i32.const 3568
    i32.const 0
    f64.const 0
    f64.const 0
    f64.const 0
    f64.const 0
    f64.const 0
    call $~lib/builtins/trace
   end
   local.get $0
   local.get $4
   i32.const 0
   call $logic/track-manager/addNewPointToGraph
   drop
   local.get $0
   local.get $2
   local.get $4
   call $logic/track-manager/shortestPathAStart
   global.get $~lib/memory/__stack_pointer
   i32.const 20
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 28
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/unit/Unit#goToCurrentPointOnTrack (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  i64.const 0
  i64.store offset=8
  local.get $1
  local.get $0
  i32.load offset=56
  i32.load offset=32
  local.tee $2
  i32.store
  local.get $1
  local.get $2
  i32.load offset=4
  local.get $0
  i32.load8_s offset=16
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $2
  i32.store offset=4
  local.get $1
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $1
  i32.store offset=12
  local.get $1
  local.get $2
  f32.load
  local.get $0
  i32.load offset=36
  f32.load
  f32.add
  f32.store
  local.get $1
  local.get $2
  f32.load offset=4
  local.get $0
  i32.load offset=36
  f32.load offset=4
  f32.add
  f32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  local.get $0
  local.get $1
  call $logic/unit/Unit#setDestination
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/unit/Unit#changeStateToShoot (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  (local $5 f64)
  (local $6 i32)
  (local $7 f64)
  (local $8 f32)
  (local $9 i32)
  (local $10 i32)
  (local $11 f32)
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $6
  i64.const 0
  i64.store
  local.get $6
  i64.const 0
  i64.store offset=8
  local.get $6
  i64.const 0
  i64.store offset=16
  block $folding-inner0
   local.get $3
   if (result i32)
    local.get $0
    i32.load offset=56
    i32.load offset=44
    i32.load8_u offset=26
   else
    i32.const 1
   end
   i32.eqz
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load offset=20
   local.tee $6
   i32.store
   local.get $6
   if (result i32)
    local.get $6
    i32.load16_s offset=24
    i32.const 0
    i32.gt_s
   else
    i32.const 0
   end
   if
    local.get $6
    f32.load offset=44
    local.get $0
    f32.load offset=44
    f32.sub
    local.get $6
    f32.load offset=48
    local.get $0
    f32.load offset=48
    f32.sub
    call $~lib/math/NativeMathf.hypot
    local.get $0
    i32.load offset=56
    i32.load offset=44
    f32.load offset=4
    f32.le
    if
     local.get $3
     if
      local.get $6
      f32.load offset=44
      local.get $0
      f32.load offset=44
      f32.sub
      local.get $0
      f32.load offset=48
      local.get $6
      f32.load offset=48
      f32.sub
      call $~lib/math/NativeMathf.atan2
      local.set $8
      local.get $0
      f32.load offset=52
      local.get $8
      call $logic/get-angle-diff/getAngleDiff
      local.get $0
      i32.load offset=56
      i32.load offset=44
      f32.load offset=32
      f32.lt
      if
       local.get $0
       i32.const 7
       i32.store offset=40
       local.get $0
       local.get $8
       f32.store offset=32
       br $folding-inner0
      end
     else
      local.get $0
      i32.const 5
      i32.store offset=40
      local.get $0
      local.get $0
      local.get $6
      f32.load offset=44
      local.get $6
      f32.load offset=48
      call $logic/unit/Unit#getAngle
      f32.store offset=52
      br $folding-inner0
     end
    end
   end
   f64.const inf
   local.set $5
   i32.const -1
   local.set $6
   loop $for-loop|0
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.load offset=16
    local.tee $9
    i32.store offset=4
    local.get $9
    i32.load offset=12
    local.get $4
    i32.gt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.tee $9
     local.get $1
     i32.load offset=16
     local.tee $10
     i32.store offset=4
     local.get $9
     local.get $10
     i32.load offset=4
     local.get $4
     i32.const 2
     i32.shl
     i32.add
     i32.load
     local.tee $9
     i32.store offset=8
     local.get $5
     local.get $9
     f32.load offset=44
     local.get $0
     f32.load offset=44
     f32.sub
     f64.promote_f32
     local.get $9
     f32.load offset=48
     local.get $0
     f32.load offset=48
     f32.sub
     f64.promote_f32
     call $~lib/math/NativeMath.hypot
     local.tee $7
     f64.gt
     if (result i32)
      local.get $9
      i32.load16_s offset=24
      i32.const 0
      i32.gt_s
     else
      i32.const 0
     end
     if
      block $for-continue|0
       local.get $3
       if
        local.get $9
        f32.load offset=44
        local.get $0
        f32.load offset=44
        f32.sub
        local.get $0
        f32.load offset=48
        local.get $9
        f32.load offset=48
        f32.sub
        call $~lib/math/NativeMathf.atan2
        local.set $8
        local.get $0
        f32.load offset=52
        local.get $8
        call $logic/get-angle-diff/getAngleDiff
        local.get $0
        i32.load offset=56
        i32.load offset=44
        f32.load offset=32
        f32.gt
        br_if $for-continue|0
       end
       local.get $4
       local.set $6
       local.get $7
       local.set $5
      end
     end
     local.get $4
     i32.const 1
     i32.add
     local.set $4
     br $for-loop|0
    end
   end
   local.get $0
   i32.load offset=56
   i32.load offset=44
   f32.load offset=4
   f64.promote_f32
   local.get $5
   f64.gt
   if
    global.get $~lib/memory/__stack_pointer
    local.tee $2
    local.get $1
    i32.load offset=16
    local.tee $1
    i32.store offset=4
    local.get $2
    local.get $1
    i32.load offset=4
    local.get $6
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $1
    i32.store offset=12
    local.get $3
    if
     local.get $0
     local.get $0
     local.get $1
     f32.load offset=44
     local.get $1
     f32.load offset=48
     call $logic/unit/Unit#getAngle
     f32.store offset=32
     local.get $0
     i32.const 7
     i32.store offset=40
    else
     local.get $0
     local.get $0
     local.get $1
     f32.load offset=44
     local.get $1
     f32.load offset=48
     call $logic/unit/Unit#getAngle
     f32.store offset=52
     local.get $0
     i32.const 5
     i32.store offset=40
    end
    local.get $0
    local.get $1
    i32.store offset=20
    local.get $1
    if
     local.get $0
     local.get $1
     i32.const 0
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
   else
    i32.const 0
    local.get $2
    local.get $3
    select
    if
     global.get $~lib/memory/__stack_pointer
     local.tee $2
     local.get $1
     i32.load offset=16
     local.tee $1
     i32.store offset=4
     local.get $2
     local.get $1
     i32.load offset=4
     local.get $6
     i32.const 2
     i32.shl
     i32.add
     i32.load
     local.tee $1
     i32.store offset=12
     local.get $0
     f32.load offset=44
     local.get $1
     f32.load offset=44
     f32.sub
     local.get $1
     f32.load offset=48
     local.get $0
     f32.load offset=48
     f32.sub
     call $~lib/math/NativeMathf.atan2
     local.set $8
     local.get $0
     i32.load offset=56
     local.tee $2
     i32.load offset=44
     f32.load offset=4
     local.get $2
     i32.load offset=40
     f32.load offset=12
     f32.sub
     local.set $11
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.load offset=32
     local.tee $2
     i32.store offset=4
     local.get $0
     local.get $2
     i32.load offset=12
     i32.const 1
     i32.sub
     i32.store8 offset=16
     global.get $~lib/memory/__stack_pointer
     i32.const 0
     call $logic/geom-types/Point#constructor
     local.tee $2
     i32.store offset=20
     local.get $2
     local.get $8
     call $~lib/math/NativeMathf.sin
     local.get $11
     f32.mul
     local.get $1
     f32.load offset=44
     f32.add
     f32.store
     local.get $2
     local.get $8
     call $~lib/math/NativeMathf.cos
     f32.neg
     local.get $11
     f32.mul
     local.get $1
     f32.load offset=48
     f32.add
     f32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=16
     local.get $0
     local.get $2
     call $logic/unit/Unit#setDestination
    else
     local.get $3
     if
      local.get $0
      i32.const 6
      i32.store offset=40
      local.get $0
      i32.const 0
      i32.store offset=20
     else
      local.get $0
      i32.const 255
      i32.store8 offset=16
      local.get $0
      i32.const 0
      i32.store offset=20
      local.get $0
      i32.load offset=40
      i32.const 3
      i32.gt_s
      if
       local.get $0
       i32.const 4
       i32.store offset=40
       local.get $0
       f32.const 0
       f32.store offset=4
       local.get $0
       f32.const 0
       f32.store offset=8
      end
     end
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 24
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/bullets-manager/addBullet (param $0 i32) (param $1 f32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 f32) (param $6 i32)
  (local $7 f32)
  (local $8 i32)
  (local $9 f32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $8
   i64.const 0
   i64.store
   local.get $8
   i64.const 0
   i64.store offset=8
   local.get $8
   i32.const 0
   i32.store offset=16
   local.get $5
   local.get $2
   f32.load offset=20
   local.tee $9
   f32.div
   local.set $7
   local.get $8
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $10
   i32.const 0
   i32.store
   local.get $10
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $10
   i32.store
   local.get $10
   local.get $1
   f32.const -0.6499999761581421
   f32.add
   local.tee $5
   call $~lib/math/NativeMathf.sin
   local.get $9
   f32.mul
   f32.store
   local.get $10
   local.get $5
   call $~lib/math/NativeMathf.cos
   f32.neg
   local.get $9
   f32.mul
   f32.const 0.5199999809265137
   f32.mul
   f32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $8
   local.get $10
   i32.store
   global.get $~lib/memory/__stack_pointer
   global.get $logic/bullets-manager/bullets_representation
   local.tee $8
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $12
   i32.const 0
   i32.store
   local.get $12
   i32.const 20
   i32.const 25
   call $~lib/rt/itcms/__new
   local.tee $12
   i32.store
   local.get $12
   f32.const 0
   f32.store
   local.get $12
   f32.const 0
   f32.store offset=4
   local.get $12
   f32.const 0
   f32.store offset=8
   local.get $12
   f32.const 0
   f32.store offset=12
   local.get $12
   f32.const 0
   f32.store offset=16
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $12
   i32.store offset=12
   local.get $12
   local.get $0
   f32.load
   f32.store
   local.get $12
   local.get $1
   f32.const -0.6499999761581421
   f32.add
   local.tee $1
   call $~lib/math/NativeMathf.sin
   local.get $1
   call $~lib/math/NativeMathf.cos
   f32.const 0.5199999809265137
   f32.mul
   call $~lib/math/NativeMathf.atan2
   f32.store offset=4
   local.get $12
   local.get $10
   f32.load
   local.get $10
   f32.load offset=4
   call $~lib/math/NativeMathf.hypot
   f32.store offset=8
   local.get $12
   local.get $2
   f32.load
   f32.store offset=12
   local.get $12
   local.get $7
   f32.store offset=16
   global.get $~lib/memory/__stack_pointer
   local.get $12
   i32.store offset=8
   local.get $8
   local.get $12
   call $~lib/array/Array<logic/geom-types/Point>#push
   local.get $6
   if
    global.get $~lib/memory/__stack_pointer
    local.tee $6
    global.get $logic/bullets-manager/bullets_data
    local.tee $8
    i32.store offset=4
    local.get $6
    i32.const 4
    i32.sub
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    i32.const 6788
    i32.lt_s
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    local.tee $10
    i32.const 0
    i32.store
    local.get $10
    i32.const 20
    i32.const 27
    call $~lib/rt/itcms/__new
    local.tee $10
    i32.store
    local.get $10
    i32.const 0
    i32.store
    local.get $10
    i32.const 0
    i32.store offset=4
    local.get $10
    i32.const 0
    i32.store offset=8
    local.get $10
    i32.const 0
    i32.store offset=12
    local.get $10
    f32.const 0
    f32.store offset=16
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $6
    local.get $10
    i32.store offset=16
    local.get $10
    local.get $4
    if (result i32)
     local.get $0
     i32.load offset=56
     i32.load offset=48
    else
     i32.const 0
    end
    i32.store
    local.get $10
    local.get $2
    i32.store offset=4
    local.get $2
    if
     local.get $10
     local.get $2
     i32.const 0
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    local.get $10
    local.get $3
    i32.store offset=8
    local.get $3
    if
     local.get $10
     local.get $3
     i32.const 0
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    local.get $10
    local.get $4
    i32.store offset=12
    local.get $4
    if
     local.get $10
     local.get $4
     i32.const 0
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    local.get $10
    local.get $7
    f32.store offset=16
    global.get $~lib/memory/__stack_pointer
    local.get $10
    i32.store offset=8
    local.get $8
    local.get $10
    call $~lib/array/Array<logic/geom-types/Point>#push
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 20
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/squad/Squad#setTask (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $4
  i64.const 0
  i64.store
  local.get $4
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.load8_u offset=6
  if
   global.get $~lib/memory/__stack_pointer
   call $logic/squad/TaskTodo#constructor
   local.tee $4
   i32.store
   local.get $4
   local.get $1
   i32.store
   local.get $1
   if
    local.get $4
    local.get $1
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   local.get $4
   local.get $2
   i32.store offset=4
   local.get $2
   if
    local.get $4
    local.get $2
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   local.get $4
   local.get $3
   i32.store offset=8
   local.get $3
   if
    local.get $4
    local.get $3
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   local.get $0
   local.get $4
   i32.store offset=8
   local.get $4
   if
    local.get $0
    local.get $4
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  local.get $0
  i32.load offset=36
  local.tee $4
  f32.load
  local.get $4
  f32.load offset=4
  i32.const 1
  call $logic/obstacles-manager/getIsPointAvailable
  i32.eqz
  if
   local.get $0
   call $logic/squad/Squad#fixSquadCenter
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  local.get $0
  call $logic/squad/Squad#resetState
  local.get $1
  if
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load offset=36
   local.tee $4
   i32.store offset=4
   local.get $0
   local.get $4
   local.get $1
   call $logic/track-manager/getTrack
   local.tee $1
   i32.store offset=32
   local.get $1
   if
    local.get $0
    local.get $1
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.load offset=16
   local.tee $4
   i32.store offset=4
   local.get $1
   i32.const 3840
   i32.store offset=8
   local.get $4
   i32.const 3840
   call $~lib/array/Array<logic/squad/Squad>#forEach
  end
  local.get $0
  local.get $2
  i32.store offset=20
  local.get $2
  if
   local.get $0
   local.get $2
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  local.get $0
  local.get $3
  i32.store offset=28
  local.get $3
  if
   local.get $0
   local.get $3
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  local.get $0
  i32.load offset=16
  local.tee $0
  i32.store offset=4
  local.get $1
  i32.const 4064
  i32.store offset=8
  local.get $0
  i32.const 4064
  call $~lib/array/Array<logic/squad/Squad>#forEach
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/squad/Squad#checkMembersCorrectness (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner1
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   local.tee $2
   i64.const 0
   i64.store
   local.get $2
   i64.const 0
   i64.store offset=8
   local.get $2
   local.get $0
   i32.load offset=16
   local.tee $3
   i32.store
   local.get $2
   i32.const 3376
   i32.store offset=4
   local.get $0
   local.get $3
   i32.const 3376
   call $~lib/array/Array<logic/unit/Unit>#filter
   local.tee $2
   i32.store offset=16
   local.get $2
   if
    local.get $0
    local.get $2
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   global.get $~lib/memory/__stack_pointer
   local.tee $2
   local.get $0
   i32.load offset=20
   local.tee $3
   i32.store offset=8
   local.get $2
   local.get $0
   i32.load offset=24
   local.tee $2
   i32.store offset=12
   local.get $3
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.load offset=16
    local.tee $3
    i32.store
    local.get $3
    i32.load offset=12
   else
    i32.const 1
   end
   i32.eqz
   if
    local.get $0
    i32.const 0
    i32.store offset=20
   end
   local.get $2
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.load offset=16
    local.tee $2
    i32.store
    local.get $2
    i32.load offset=12
   else
    i32.const 1
   end
   i32.eqz
   if
    local.get $0
    i32.const 0
    i32.store offset=24
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   block $__inlined_func$logic/squad/Squad#keepCoherency
    global.get $~lib/memory/__stack_pointer
    i32.const 6788
    i32.lt_s
    br_if $folding-inner1
    global.get $~lib/memory/__stack_pointer
    local.tee $2
    i64.const 0
    i64.store
    block $__inlined_func$~lib/array/Array<logic/unit/Unit>#some (result i32)
     local.get $2
     local.get $0
     i32.load offset=16
     local.tee $3
     i32.store
     local.get $2
     i32.const 3408
     i32.store offset=4
     local.get $2
     i32.const 4
     i32.sub
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 6788
     i32.lt_s
     br_if $folding-inner1
     global.get $~lib/memory/__stack_pointer
     i32.const 0
     i32.store
     local.get $3
     i32.load offset=12
     local.set $2
     loop $for-loop|0
      local.get $2
      local.get $3
      i32.load offset=12
      local.tee $4
      local.get $2
      local.get $4
      i32.lt_s
      select
      local.get $1
      i32.gt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.get $3
       i32.load offset=4
       local.get $1
       i32.const 2
       i32.shl
       i32.add
       i32.load
       local.tee $4
       i32.store
       local.get $4
       local.get $1
       local.get $3
       i32.const 3408
       i32.load
       call_indirect $0 (type $i32_i32_i32_=>_i32)
       if
        global.get $~lib/memory/__stack_pointer
        i32.const 4
        i32.add
        global.set $~lib/memory/__stack_pointer
        i32.const 1
        br $__inlined_func$~lib/array/Array<logic/unit/Unit>#some
       end
       local.get $1
       i32.const 1
       i32.add
       local.set $1
       br $for-loop|0
      end
     end
     global.get $~lib/memory/__stack_pointer
     i32.const 4
     i32.add
     global.set $~lib/memory/__stack_pointer
     i32.const 0
    end
    if (result i32)
     i32.const 0
    else
     local.get $0
     i32.load offset=36
     local.tee $1
     f32.load
     local.get $1
     f32.load offset=4
     i32.const 1
     call $logic/obstacles-manager/getIsPointAvailable
    end
    if
     local.get $0
     i32.load8_u offset=6
     if
      local.get $0
      i32.const 0
      i32.store8 offset=6
      global.get $~lib/memory/__stack_pointer
      i32.const 12
      i32.sub
      global.set $~lib/memory/__stack_pointer
      global.get $~lib/memory/__stack_pointer
      i32.const 6788
      i32.lt_s
      br_if $folding-inner1
      global.get $~lib/memory/__stack_pointer
      local.tee $1
      i64.const 0
      i64.store
      local.get $1
      i32.const 0
      i32.store offset=8
      local.get $0
      call $logic/squad/Squad#resetState
      local.get $0
      i32.load offset=8
      i32.load
      if
       global.get $~lib/memory/__stack_pointer
       local.tee $1
       local.get $0
       i32.load offset=8
       i32.load
       local.tee $2
       i32.store
       local.get $1
       local.get $0
       i32.load offset=8
       i32.load offset=4
       local.tee $3
       i32.store offset=4
       local.get $1
       local.get $0
       i32.load offset=8
       i32.load offset=8
       local.tee $1
       i32.store offset=8
       local.get $0
       local.get $2
       local.get $3
       local.get $1
       call $logic/squad/Squad#setTask
      end
      local.get $0
      call $logic/squad/Squad#checkMembersCorrectness
      global.get $~lib/memory/__stack_pointer
      i32.const 12
      i32.add
      global.set $~lib/memory/__stack_pointer
     end
    else
     local.get $0
     call $logic/squad/Squad#fixSquadCenter
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.add
    global.set $~lib/memory/__stack_pointer
    br $__inlined_func$logic/squad/Squad#keepCoherency
   end
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.load offset=16
   local.tee $0
   i32.store
   local.get $1
   i32.const 4096
   i32.store offset=4
   local.get $0
   i32.const 4096
   call $~lib/array/Array<logic/squad/Squad>#forEach
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/faction/Faction#checkSquadsCorrectness~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  call $logic/squad/Squad#checkMembersCorrectness
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load offset=16
  local.tee $0
  i32.store
  local.get $0
  i32.load offset=12
  i32.const 0
  i32.ne
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/squads-grid-manager/addSquadToGrid (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  i64.const 0
  i64.store offset=8
  local.get $1
  i32.const 0
  i32.store offset=16
  local.get $0
  i32.load offset=36
  local.tee $2
  f32.load
  global.get $logic/squads-grid-manager/gridMapScaleX
  f32.mul
  i32.trunc_f32_s
  global.get $logic/squads-grid-manager/gridMapWidth
  local.get $2
  f32.load offset=4
  global.get $logic/squads-grid-manager/gridMapScaleY
  f32.mul
  i32.trunc_f32_s
  i32.mul
  i32.add
  local.set $2
  local.get $1
  global.get $logic/squads-grid-manager/grid
  local.tee $3
  i32.store
  local.get $1
  local.get $3
  i32.load offset=4
  local.get $2
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $1
  i32.store offset=4
  local.get $1
  if
   local.get $1
   local.get $0
   call $~lib/array/Array<logic/geom-types/Point>#push
  else
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   global.get $logic/squads-grid-manager/grid
   local.tee $3
   i32.store
   local.get $1
   i32.const 1
   i32.const 23
   i32.const 0
   call $~lib/rt/__newArray
   local.tee $1
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.load offset=4
   i32.store offset=16
   local.get $1
   i32.const 0
   local.get $0
   call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   local.get $3
   local.get $2
   local.get $1
   call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/squads-grid-manager/fillGrid~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  local.get $0
  i32.load offset=8
  local.tee $2
  i32.store
  local.get $2
  call $logic/squads-grid-manager/addSquadToGrid
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load offset=4
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4192
  i32.store offset=4
  local.get $0
  i32.const 4192
  call $~lib/array/Array<logic/squad/Squad>#forEach
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/squads-grid-manager/getSquadsFromGridByCircle~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i64.const 0
  i64.store
  local.get $2
  global.get $logic/squads-grid-manager/grid
  local.tee $1
  i32.store
  local.get $2
  local.get $1
  i32.load offset=4
  local.get $0
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $0
  i32.store offset=4
  local.get $0
  i32.eqz
  if
   i32.const 0
   i32.const 23
   i32.const 4320
   call $~lib/rt/__newArray
   local.set $0
  end
  local.get $2
  local.get $0
  i32.store offset=4
  local.get $0
  i32.eqz
  if
   i32.const 3872
   i32.const 4352
   i32.const 188
   i32.const 15
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $logic/squads-grid-manager/getSquadsFromGridByCircle (param $0 i32) (param $1 f32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 f32)
  (local $9 f32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $3
   i64.const 0
   i64.store
   local.get $3
   i32.const 0
   i32.store offset=8
   local.get $3
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $2
   i64.const 0
   i64.store
   local.get $2
   local.get $0
   call $logic/squads-grid-manager/pointToGridFnc
   local.tee $4
   i32.store
   local.get $4
   f32.load offset=4
   local.tee $8
   local.get $1
   f32.const 3.3333334140479565e-03
   f32.mul
   global.get $logic/constants/SQUARE_OF_TWO
   f32.add
   local.tee $1
   f32.sub
   f32.ceil
   f32.const 0
   f32.max
   i32.trunc_f32_s
   local.set $0
   local.get $8
   local.get $1
   f32.add
   f32.floor
   global.get $logic/squads-grid-manager/gridMapHeight
   f32.convert_i32_s
   f32.const 1
   f32.sub
   f32.min
   i32.trunc_f32_s
   local.set $5
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 34
   i32.const 4288
   call $~lib/rt/__newArray
   local.tee $7
   i32.store offset=4
   loop $for-loop|0
    local.get $0
    local.get $5
    i32.le_s
    if
     local.get $4
     f32.load
     local.tee $8
     local.get $1
     local.get $1
     f32.mul
     local.get $0
     f32.convert_i32_s
     local.get $4
     f32.load offset=4
     f32.sub
     local.tee $9
     local.get $9
     f32.mul
     f32.sub
     f32.sqrt
     f32.floor
     local.tee $9
     f32.sub
     f32.const 0
     f32.max
     i32.trunc_f32_s
     local.set $2
     local.get $8
     local.get $9
     f32.add
     global.get $logic/squads-grid-manager/gridMapWidth
     f32.convert_i32_s
     f32.const 1
     f32.sub
     f32.min
     i32.trunc_f32_s
     local.set $6
     loop $for-loop|1
      local.get $2
      local.get $6
      i32.le_s
      if
       local.get $7
       local.get $2
       global.get $logic/squads-grid-manager/gridMapWidth
       local.get $0
       i32.mul
       i32.add
       call $~lib/array/Array<u32>#push
       local.get $2
       i32.const 1
       i32.add
       local.set $2
       br $for-loop|1
      end
     end
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $3
   local.get $7
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 4432
   i32.store offset=8
   local.get $7
   i32.const 4432
   call $~lib/array/Array<i32>#map<~lib/array/Array<logic/squad/Squad>>
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   call $~lib/array/Array<~lib/array/Array<logic/squad/Squad>>#flat
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/search-for-enemy/searchForEnemy~anonymous|0~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 f64)
  (local $5 f64)
  (local $6 i32)
  (local $7 f32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 28
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner1
   block $folding-inner0
    global.get $~lib/memory/__stack_pointer
    i32.const 6788
    i32.lt_s
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    local.tee $1
    i64.const 0
    i64.store
    local.get $1
    i64.const 0
    i64.store offset=8
    local.get $1
    i64.const 0
    i64.store offset=16
    local.get $1
    i32.const 0
    i32.store offset=24
    local.get $0
    i32.load offset=44
    i32.load8_u offset=26
    if (result i32)
     i32.const 0
    else
     local.get $0
     i32.load offset=20
    end
    br_if $folding-inner1
    global.get $~lib/memory/__stack_pointer
    local.tee $1
    local.get $0
    i32.load offset=16
    local.tee $2
    i32.store offset=4
    local.get $1
    i32.const 4256
    i32.store offset=8
    local.get $2
    i32.const 4256
    call $~lib/array/Array<logic/unit/Unit>#filter
    local.set $1
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store
    local.get $1
    i32.load offset=12
    local.set $1
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=16
    local.tee $2
    i32.store
    local.get $2
    i32.load offset=12
    i32.const 2
    i32.div_s
    local.get $1
    i32.lt_s
    local.set $1
    local.get $0
    i32.load8_u offset=6
    i32.eqz
    local.tee $2
    i32.eqz
    if
     local.get $2
     local.set $1
    end
    local.get $1
    if (result i32)
     i32.const 0
    else
     local.get $0
     i32.load offset=20
    end
    br_if $folding-inner1
    local.get $1
    local.tee $3
    if (result f32)
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load offset=16
     local.tee $1
     i32.store
     local.get $1
     i32.const 2464
     i32.load
     call_indirect $0 (type $i32_=>_f32)
    else
     f32.const 0
    end
    local.set $7
    global.get $~lib/memory/__stack_pointer
    i32.const 12
    i32.sub
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    i32.const 6788
    i32.lt_s
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    local.tee $1
    i64.const 0
    i64.store
    local.get $1
    i32.const 0
    i32.store offset=8
    local.get $1
    local.get $0
    i32.load offset=36
    local.tee $2
    i32.store
    local.get $1
    local.get $0
    i32.load offset=24
    local.tee $1
    i32.store offset=4
    block $__inlined_func$logic/search-for-enemy/isCurrentSecondaryAimInRange
     local.get $1
     i32.eqz
     if
      global.get $~lib/memory/__stack_pointer
      i32.const 12
      i32.add
      global.set $~lib/memory/__stack_pointer
      i32.const 0
      local.set $1
      br $__inlined_func$logic/search-for-enemy/isCurrentSecondaryAimInRange
     end
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.load offset=36
     local.tee $1
     i32.store offset=8
     local.get $2
     f32.load
     local.get $1
     f32.load
     f32.sub
     local.get $2
     f32.load offset=4
     local.get $1
     f32.load offset=4
     f32.sub
     call $~lib/math/NativeMathf.hypot
     local.get $0
     i32.load offset=44
     f32.load offset=4
     f32.const 60
     f32.sub
     f32.lt
     if
      local.get $3
      if
       local.get $7
       local.get $1
       f32.load
       local.get $2
       f32.load
       f32.sub
       local.get $2
       f32.load offset=4
       local.get $1
       f32.load offset=4
       f32.sub
       call $~lib/math/NativeMathf.atan2
       call $logic/get-angle-diff/getAngleDiff
       local.get $0
       i32.load offset=44
       f32.load offset=32
       f32.lt
       local.set $1
       global.get $~lib/memory/__stack_pointer
       i32.const 12
       i32.add
       global.set $~lib/memory/__stack_pointer
       br $__inlined_func$logic/search-for-enemy/isCurrentSecondaryAimInRange
      end
      global.get $~lib/memory/__stack_pointer
      i32.const 12
      i32.add
      global.set $~lib/memory/__stack_pointer
      i32.const 1
      local.set $1
      br $__inlined_func$logic/search-for-enemy/isCurrentSecondaryAimInRange
     end
     global.get $~lib/memory/__stack_pointer
     i32.const 12
     i32.add
     global.set $~lib/memory/__stack_pointer
     i32.const 0
     local.set $1
    end
    local.get $1
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 28
     i32.add
     global.set $~lib/memory/__stack_pointer
     return
    end
    global.get $~lib/memory/__stack_pointer
    local.tee $1
    local.get $0
    i32.load offset=36
    local.tee $8
    i32.store offset=12
    local.get $1
    local.get $8
    local.get $0
    i32.load offset=44
    f32.load offset=4
    f32.const 320
    f32.add
    call $logic/squads-grid-manager/getSquadsFromGridByCircle
    local.tee $6
    i32.store offset=16
    f64.const inf
    local.set $4
    i32.const -1
    local.set $1
    i32.const 0
    local.set $2
    loop $for-loop|0
     local.get $6
     i32.load offset=12
     local.get $2
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.load offset=4
      local.get $2
      i32.const 2
      i32.shl
      i32.add
      i32.load
      local.tee $9
      i32.store offset=20
      block $for-continue|0
       local.get $9
       i32.load offset=48
       local.get $0
       i32.load offset=48
       i32.eq
       br_if $for-continue|0
       global.get $~lib/memory/__stack_pointer
       local.get $9
       i32.load offset=36
       local.tee $9
       i32.store offset=24
       local.get $4
       local.get $9
       f32.load
       local.get $8
       f32.load
       f32.sub
       f64.promote_f32
       local.get $9
       f32.load offset=4
       local.get $8
       f32.load offset=4
       f32.sub
       f64.promote_f32
       call $~lib/math/NativeMath.hypot
       local.tee $5
       f64.gt
       if
        local.get $3
        if
         local.get $7
         local.get $9
         f32.load
         local.get $8
         f32.load
         f32.sub
         local.get $8
         f32.load offset=4
         local.get $9
         f32.load offset=4
         f32.sub
         call $~lib/math/NativeMathf.atan2
         call $logic/get-angle-diff/getAngleDiff
         local.get $0
         i32.load offset=44
         f32.load offset=32
         f32.gt
         br_if $for-continue|0
        end
        local.get $5
        local.set $4
        local.get $2
        local.set $1
       end
      end
      local.get $2
      i32.const 1
      i32.add
      local.set $2
      br $for-loop|0
     end
    end
    local.get $0
    local.get $1
    i32.const -1
    i32.ne
    if (result i32)
     local.get $6
     i32.load offset=4
     local.get $1
     i32.const 2
     i32.shl
     i32.add
     i32.load
    else
     i32.const 0
    end
    local.tee $1
    i32.store offset=24
    local.get $1
    if
     local.get $0
     local.get $1
     i32.const 0
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 28
    i32.add
    global.set $~lib/memory/__stack_pointer
    return
   end
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.const 0
  i32.store offset=24
  global.get $~lib/memory/__stack_pointer
  i32.const 28
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/search-for-enemy/searchForEnemy~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  local.get $0
  i32.load offset=4
  local.tee $0
  i32.store
  local.get $1
  i32.const 4464
  i32.store offset=4
  local.get $0
  i32.const 4464
  call $~lib/array/Array<logic/squad/Squad>#forEach
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/bullets-manager/doExplosion (param $0 i32)
  (local $1 i32)
  (local $2 f32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 f32)
  (local $8 f32)
  (local $9 f32)
  (local $10 i32)
  (local $11 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $3
  i64.const 0
  i64.store
  local.get $3
  i64.const 0
  i64.store offset=8
  local.get $3
  i32.const 0
  i32.store offset=16
  local.get $3
  local.get $0
  i32.load offset=12
  local.tee $1
  i32.store
  local.get $1
  i32.eqz
  if
   i32.const 3872
   i32.const 4528
   i32.const 61
   i32.const 27
   call $~lib/builtins/abort
   unreachable
  end
  local.get $3
  local.get $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  local.get $0
  i32.load offset=4
  f32.load offset=28
  local.tee $2
  call $logic/squads-grid-manager/getSquadsFromGridByCircle
  local.tee $6
  i32.store offset=4
  local.get $2
  f32.const 160
  f32.add
  local.set $8
  loop $for-loop|0
   local.get $6
   i32.load offset=12
   local.get $4
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.load offset=4
    local.get $4
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $5
    i32.store offset=8
    local.get $5
    i32.load offset=36
    local.tee $3
    f32.load
    local.get $1
    f32.load
    f32.sub
    local.get $3
    f32.load offset=4
    local.get $1
    f32.load offset=4
    f32.sub
    call $~lib/math/NativeMathf.hypot
    local.get $8
    f32.lt
    if
     i32.const 0
     local.set $3
     loop $for-loop|1
      global.get $~lib/memory/__stack_pointer
      local.get $5
      i32.load offset=16
      local.tee $10
      i32.store offset=12
      local.get $10
      i32.load offset=12
      local.get $3
      i32.gt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.tee $11
       local.get $5
       i32.load offset=16
       local.tee $10
       i32.store offset=12
       local.get $11
       local.get $10
       i32.load offset=4
       local.get $3
       i32.const 2
       i32.shl
       i32.add
       i32.load
       local.tee $10
       i32.store offset=16
       local.get $2
       local.get $10
       f32.load offset=44
       local.get $1
       f32.load
       f32.sub
       local.get $10
       f32.load offset=48
       local.get $1
       f32.load offset=4
       f32.sub
       call $~lib/math/NativeMathf.hypot
       local.tee $7
       f32.gt
       if
        local.get $10
        f32.load offset=44
        local.get $1
        f32.load
        f32.sub
        local.get $1
        f32.load offset=4
        local.get $10
        f32.load offset=48
        f32.sub
        call $~lib/math/NativeMathf.atan2
        local.set $9
        local.get $10
        local.get $10
        i32.load16_s offset=24
        local.get $0
        i32.load offset=4
        i32.load16_u offset=24
        f32.convert_i32_u
        f32.const 1
        local.get $7
        local.get $2
        f32.div
        f32.sub
        f32.mul
        i32.trunc_f32_s
        i32.sub
        i32.store16 offset=24
        local.get $10
        i32.load16_s offset=24
        i32.const 0
        i32.le_s
        if (result i32)
         local.get $10
         i32.load offset=40
         i32.const 3
         i32.gt_s
        else
         i32.const 0
        end
        if
         local.get $10
         i32.const 0
         i32.store offset=40
         local.get $10
         f32.const 0
         f32.store offset=4
         local.get $10
         f32.const 0
         f32.store offset=8
        end
        local.get $10
        local.get $9
        f32.const 3
        local.get $2
        local.get $7
        f32.sub
        f32.const 0.10000000149011612
        f32.mul
        f32.max
        call $logic/unit/Unit#changeStateToFly
       end
       local.get $3
       i32.const 1
       i32.add
       local.set $3
       br $for-loop|1
      end
     end
    end
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/bullets-manager/updateBullets~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  local.get $0
  f32.load offset=16
  f32.const 1.1920928955078125e-07
  f32.lt
  if
   local.get $0
   i32.load offset=4
   f32.load offset=28
   f32.const 1.1920928955078125e-07
   f32.gt
   if
    local.get $0
    call $logic/bullets-manager/doExplosion
   else
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=8
    local.tee $1
    i32.store offset=4
    local.get $1
    i32.eqz
    if
     i32.const 3872
     i32.const 4528
     i32.const 95
     i32.const 10
     call $~lib/builtins/abort
     unreachable
    end
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store
    local.get $1
    local.get $1
    i32.load16_s offset=24
    local.get $0
    i32.load offset=4
    i32.load16_u offset=24
    i32.sub
    i32.store16 offset=24
    local.get $1
    i32.load16_s offset=24
    i32.const 0
    i32.le_s
    if (result i32)
     local.get $1
     i32.load offset=40
     i32.const 3
     i32.gt_s
    else
     i32.const 0
    end
    if
     local.get $1
     i32.const 0
     i32.store offset=40
     local.get $1
     f32.const 0
     f32.store offset=4
     local.get $1
     f32.const 0
     f32.store offset=8
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  local.get $0
  local.get $0
  f32.load offset=16
  f32.const 1
  f32.sub
  f32.store offset=16
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 1
 )
 (func $logic/get-random/getRandom (result f32)
  (local $0 i32)
  (local $1 i32)
  (local $2 f32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $0
  i32.const 0
  i32.store
  global.get $logic/get-random/index
  i32.const 1
  i32.add
  i32.const 256
  i32.rem_s
  global.set $logic/get-random/index
  local.get $0
  global.get $logic/get-random/lookUpTable
  local.tee $1
  i32.store
  global.get $logic/get-random/index
  i32.const 2
  i32.shl
  local.get $1
  i32.add
  f32.load
  local.get $0
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/squad/Squad#update (param $0 i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  local.get $0
  i32.load16_u offset=4
  if
   local.get $0
   local.get $0
   i32.load16_u offset=4
   i32.const 1
   i32.sub
   i32.store16 offset=4
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  local.get $0
  i32.load offset=16
  local.tee $0
  i32.store
  local.get $1
  i32.const 4912
  i32.store offset=4
  local.get $0
  i32.const 4912
  call $~lib/array/Array<logic/squad/Squad>#forEach
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/factory/Factory#update (param $0 i32) (result i32)
  (local $1 f32)
  (local $2 f32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 f32)
  (local $7 f32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $3
   i64.const 0
   i64.store
   local.get $3
   i64.const 0
   i64.store offset=8
   local.get $3
   i32.const 0
   i32.store offset=16
   local.get $3
   local.get $0
   i32.load offset=8
   local.tee $3
   i32.store
   local.get $3
   if
    local.get $3
    call $logic/squad/Squad#update
    local.get $0
    i32.load8_u offset=12
    if
     local.get $0
     local.get $0
     i32.load8_u offset=12
     i32.const 1
     i32.sub
     i32.store8 offset=12
    else
     local.get $0
     i32.const 10
     i32.store8 offset=12
     global.get $~lib/memory/__stack_pointer
     local.tee $4
     i32.const 8
     i32.sub
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 6788
     i32.lt_s
     br_if $folding-inner0
     global.get $~lib/memory/__stack_pointer
     i64.const 0
     i64.store
     call $logic/get-random/getRandom
     f32.const 0.5
     f32.sub
     local.tee $6
     f32.const 400
     f32.mul
     local.set $2
     local.get $0
     f32.load offset=24
     local.get $0
     f32.load offset=32
     f32.const 1.5707963705062866
     f32.add
     local.tee $7
     call $~lib/math/NativeMathf.sin
     local.get $2
     f32.mul
     f32.add
     local.set $1
     local.get $0
     f32.load offset=28
     local.get $7
     call $~lib/math/NativeMathf.cos
     local.get $2
     f32.mul
     f32.sub
     local.set $2
     local.get $0
     f32.load offset=32
     local.get $6
     f32.const 0.5
     f32.mul
     f32.add
     local.set $6
     global.get $~lib/memory/__stack_pointer
     i32.const 3
     i32.const 46
     i32.const 0
     call $~lib/rt/__newArray
     local.tee $5
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.load offset=4
     i32.store offset=4
     local.get $5
     i32.load offset=4
     local.get $1
     f32.store
     local.get $5
     i32.load offset=4
     local.get $2
     f32.store offset=4
     local.get $5
     i32.load offset=4
     local.get $6
     f32.store offset=8
     global.get $~lib/memory/__stack_pointer
     i32.const 8
     i32.add
     global.set $~lib/memory/__stack_pointer
     local.get $4
     local.get $5
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $3
     local.get $5
     i32.load offset=4
     f32.load
     local.get $5
     i32.load offset=4
     f32.load offset=4
     local.get $5
     i32.load offset=4
     f32.load offset=8
     call $logic/squad/Squad#addMember
     local.tee $4
     i32.store offset=8
     call $logic/get-random/getRandom
     f32.const 7
     f32.mul
     f32.const 4.5
     f32.add
     local.set $1
     local.get $4
     local.get $0
     f32.load offset=32
     local.get $1
     call $logic/unit/Unit#changeStateToFly
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.load offset=16
     local.tee $4
     i32.store offset=12
     local.get $4
     i32.load offset=12
     local.get $3
     i32.load offset=40
     i32.load8_u offset=6
     i32.eq
     if
      local.get $0
      i32.const 0
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      i32.const 20
      i32.add
      global.set $~lib/memory/__stack_pointer
      local.get $3
      return
     end
    end
   else
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $3
    i32.store offset=12
    local.get $3
    i32.load offset=12
    i32.const 0
    i32.gt_s
    if
     local.get $0
     i32.load16_u offset=4
     if
      local.get $0
      local.get $0
      i32.load16_u offset=4
      i32.const 1
      i32.sub
      i32.store16 offset=4
     else
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $3
      i32.store offset=12
      local.get $3
      i32.load offset=12
      i32.const 1
      i32.gt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.tee $3
       global.get $logic/squad-details/SQUAD_DETAILS
       local.tee $4
       i32.store offset=12
       local.get $3
       local.get $0
       i32.load
       local.tee $5
       i32.store offset=16
       local.get $3
       local.get $4
       local.get $5
       i32.load offset=4
       i32.load offset=4
       i32.load offset=4
       call $~lib/map/Map<i32,logic/ability-details/Ability>#get
       local.tee $3
       i32.store offset=8
       local.get $0
       i32.load16_u offset=4
       local.get $3
       i32.load16_u offset=4
       i32.eq
       drop
      end
      local.get $0
      i32.load offset=20
      local.set $8
      global.get $~lib/memory/__stack_pointer
      local.tee $4
      local.get $0
      i32.load
      local.tee $3
      i32.store offset=12
      local.get $4
      i32.const 4
      i32.sub
      global.set $~lib/memory/__stack_pointer
      global.get $~lib/memory/__stack_pointer
      i32.const 6788
      i32.lt_s
      br_if $folding-inner0
      global.get $~lib/memory/__stack_pointer
      i32.const 0
      i32.store
      local.get $3
      i32.load offset=12
      local.tee $5
      i32.const 0
      i32.le_s
      if
       i32.const 3792
       i32.const 1632
       i32.const 350
       i32.const 18
       call $~lib/builtins/abort
       unreachable
      end
      global.get $~lib/memory/__stack_pointer
      local.get $3
      i32.load offset=4
      local.tee $4
      i32.load
      local.tee $9
      i32.store
      local.get $4
      local.get $4
      i32.const 4
      i32.add
      local.get $5
      i32.const 1
      i32.sub
      local.tee $5
      i32.const 2
      i32.shl
      local.tee $10
      call $~lib/memory/memory.copy
      local.get $4
      local.get $10
      i32.add
      i32.const 0
      i32.store
      local.get $3
      local.get $5
      i32.store offset=12
      global.get $~lib/memory/__stack_pointer
      i32.const 4
      i32.add
      global.set $~lib/memory/__stack_pointer
      local.get $0
      local.get $8
      local.get $9
      i32.load offset=4
      call $logic/squad/Squad#constructor
      local.tee $3
      i32.store offset=8
      local.get $3
      if
       local.get $0
       local.get $3
       i32.const 0
       call $byn-split-outlined-A$~lib/rt/itcms/__link
      end
     end
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 20
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 0
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/factory/Factory#addSquadDoProduction (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $2
   i64.const 0
   i64.store
   local.get $2
   i64.const 0
   i64.store offset=8
   local.get $2
   global.get $logic/squad-details/SQUAD_DETAILS
   local.tee $3
   i32.store
   local.get $2
   local.get $3
   local.get $1
   call $~lib/map/Map<i32,logic/ability-details/Ability>#get
   local.tee $2
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $3
   i32.store
   local.get $3
   i32.load offset=12
   i32.eqz
   if
    local.get $0
    i32.load16_u offset=4
    local.get $2
    i32.load16_u offset=4
    i32.eq
    drop
   end
   global.get $~lib/memory/__stack_pointer
   local.tee $3
   local.get $0
   i32.load
   local.tee $0
   i32.store
   local.get $3
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $4
   i32.const 0
   i32.store
   local.get $4
   i32.const 8
   i32.const 39
   call $~lib/rt/itcms/__new
   local.tee $4
   i32.store
   local.get $4
   f32.const 0
   f32.store
   local.get $4
   i32.const 0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $3
   local.get $4
   i32.store offset=12
   local.get $4
   local.get $2
   i32.load16_u offset=4
   f32.convert_i32_u
   f32.store
   local.get $4
   local.get $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store offset=8
   local.get $0
   local.get $4
   call $~lib/array/Array<logic/geom-types/Point>#push
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/index/updateUniverse
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner1
   block $folding-inner0
    global.get $~lib/memory/__stack_pointer
    i32.const 6788
    i32.lt_s
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    i64.const 0
    i64.store
    global.get $logic/index/time
    i32.const 1
    i32.add
    i32.const 1000
    i32.rem_u
    global.set $logic/index/time
    global.get $logic/index/time
    i32.const 15
    i32.rem_u
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     local.tee $1
     i32.const 2528
     i32.store
     local.get $1
     i32.const 3344
     i32.store offset=4
     i32.const 2528
     i32.const 3344
     call $~lib/array/Array<logic/squad/Squad>#forEach
    end
    global.get $logic/index/time
    i32.const 30
    i32.rem_u
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     local.tee $1
     i32.const 2528
     i32.store
     local.get $1
     i32.const 4160
     i32.store offset=4
     i32.const 2528
     i32.const 4160
     call $~lib/array/Array<logic/squad/Squad>#forEach
    end
    global.get $logic/index/time
    i32.const 15
    i32.rem_u
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     local.tee $1
     i32.const 2528
     i32.store
     local.get $1
     i32.const 4
     i32.sub
     global.set $~lib/memory/__stack_pointer
     block $__inlined_func$logic/squads-grid-manager/fillGrid
      global.get $~lib/memory/__stack_pointer
      i32.const 6788
      i32.lt_s
      br_if $folding-inner1
      global.get $~lib/memory/__stack_pointer
      local.tee $1
      i32.const 0
      i32.store
      local.get $1
      i32.const 8
      i32.sub
      global.set $~lib/memory/__stack_pointer
      global.get $~lib/memory/__stack_pointer
      i32.const 6788
      i32.lt_s
      br_if $folding-inner1
      global.get $logic/squads-grid-manager/gridMapWidth
      global.get $logic/squads-grid-manager/gridMapHeight
      i32.mul
      local.set $1
      global.get $~lib/memory/__stack_pointer
      local.tee $2
      i64.const 0
      i64.store
      local.get $2
      i32.const 16
      i32.const 24
      call $~lib/rt/itcms/__new
      local.tee $2
      i32.store
      local.get $2
      i32.const 0
      i32.store
      local.get $2
      i32.const 0
      i32.store offset=4
      local.get $2
      i32.const 0
      i32.store offset=8
      local.get $2
      i32.const 0
      i32.store offset=12
      local.get $1
      i32.const 268435455
      i32.gt_u
      if
       i32.const 1056
       i32.const 1632
       i32.const 70
       i32.const 60
       call $~lib/builtins/abort
       unreachable
      end
      global.get $~lib/memory/__stack_pointer
      local.get $1
      i32.const 8
      local.get $1
      i32.const 8
      i32.gt_u
      select
      i32.const 2
      i32.shl
      local.tee $3
      i32.const 0
      call $~lib/rt/itcms/__new
      local.tee $4
      i32.store offset=4
      local.get $2
      local.get $4
      i32.store
      local.get $4
      if
       local.get $2
       local.get $4
       i32.const 0
       call $byn-split-outlined-A$~lib/rt/itcms/__link
      end
      local.get $2
      local.get $4
      i32.store offset=4
      local.get $2
      local.get $3
      i32.store offset=8
      local.get $2
      local.get $1
      i32.store offset=12
      global.get $~lib/memory/__stack_pointer
      i32.const 8
      i32.add
      global.set $~lib/memory/__stack_pointer
      local.get $2
      global.set $logic/squads-grid-manager/grid
      global.get $~lib/memory/__stack_pointer
      i32.const 4224
      i32.store
      i32.const 2528
      i32.const 4224
      call $~lib/array/Array<logic/squad/Squad>#forEach
      global.get $~lib/memory/__stack_pointer
      i32.const 4
      i32.add
      global.set $~lib/memory/__stack_pointer
      br $__inlined_func$logic/squads-grid-manager/fillGrid
     end
    end
    global.get $logic/index/time
    i32.const 60
    i32.rem_u
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     local.tee $1
     i32.const 2528
     i32.store
     local.get $1
     i32.const 4
     i32.sub
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 6788
     i32.lt_s
     br_if $folding-inner0
     global.get $~lib/memory/__stack_pointer
     local.tee $1
     i32.const 0
     i32.store
     local.get $1
     i32.const 4496
     i32.store
     i32.const 2528
     i32.const 4496
     call $~lib/array/Array<logic/squad/Squad>#forEach
     global.get $~lib/memory/__stack_pointer
     i32.const 4
     i32.add
     global.set $~lib/memory/__stack_pointer
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.sub
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    i32.const 6788
    i32.lt_s
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    local.tee $1
    i64.const 0
    i64.store
    local.get $1
    global.get $logic/bullets-manager/bullets_data
    local.tee $2
    i32.store
    local.get $1
    i32.const 4880
    i32.store offset=4
    local.get $1
    i32.const 8
    i32.sub
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    i32.const 6788
    i32.lt_s
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    local.tee $1
    i64.const 0
    i64.store
    local.get $1
    i32.const 0
    i32.const 28
    i32.const 0
    call $~lib/rt/__newArray
    local.tee $1
    i32.store
    local.get $2
    i32.load offset=12
    local.set $3
    loop $for-loop|0
     local.get $3
     local.get $2
     i32.load offset=12
     local.tee $4
     local.get $3
     local.get $4
     i32.lt_s
     select
     local.get $0
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $2
      i32.load offset=4
      local.get $0
      i32.const 2
      i32.shl
      i32.add
      i32.load
      local.tee $4
      i32.store offset=4
      local.get $4
      local.get $0
      local.get $2
      i32.const 4880
      i32.load
      call_indirect $0 (type $i32_i32_i32_=>_i32)
      if
       local.get $1
       local.get $4
       call $~lib/array/Array<logic/geom-types/Point>#push
      end
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      br $for-loop|0
     end
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $1
    global.set $logic/bullets-manager/bullets_data
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.add
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    i32.const 2528
    i32.store
    global.get $~lib/memory/__stack_pointer
    i32.const 4976
    i32.store offset=4
    i32.const 2528
    i32.const 4976
    call $~lib/array/Array<logic/squad/Squad>#forEach
    global.get $logic/index/wasEnemyCreated
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     i32.const 2528
     i32.store
     i32.const 2540
     i32.load
     i32.const 1
     i32.gt_s
    end
    if
     i32.const 1
     global.set $logic/index/wasEnemyCreated
     global.get $~lib/memory/__stack_pointer
     i32.const 2528
     i32.store offset=4
     i32.const 2528
     i32.const 1
     call $~lib/array/Array<logic/geom-types/Point>#__get
     i32.load
     local.set $0
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     local.get $0
     i32.const 2
     call $logic/factory/Factory#addSquadDoProduction
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.add
    global.set $~lib/memory/__stack_pointer
    return
   end
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/squad/Squad#getRepresentation (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $1
  local.get $0
  i32.load offset=16
  local.tee $0
  i32.store offset=4
  local.get $1
  i32.const 5008
  i32.store offset=8
  local.get $0
  i32.const 5008
  call $~lib/array/Array<logic/geom-types/Line>#map<~lib/array/Array<f32>>
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/array/Array<~lib/array/Array<f32>>#flat
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/index/getUniverseRepresentation (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $0
   i64.const 0
   i64.store
   local.get $0
   i64.const 0
   i64.store offset=8
   call $logic/index/updateUniverse
   global.get $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 2528
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 5072
   i32.store offset=8
   i32.const 2528
   i32.const 5072
   call $~lib/array/Array<logic/geom-types/Line>#map<~lib/array/Array<f32>>
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   local.get $1
   call $~lib/array/Array<~lib/array/Array<f32>>#flat
   local.tee $1
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $0
   i64.const 0
   i64.store
   local.get $0
   i64.const 0
   i64.store offset=8
   local.get $0
   global.get $logic/bullets-manager/bullets_representation
   local.tee $2
   i32.store offset=4
   local.get $0
   i32.const 5104
   i32.store offset=8
   local.get $2
   i32.const 5104
   call $~lib/array/Array<logic/geom-types/Line>#map<~lib/array/Array<f32>>
   local.set $2
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store
   local.get $0
   local.get $2
   call $~lib/array/Array<~lib/array/Array<f32>>#flat
   local.tee $2
   i32.store offset=12
   local.get $2
   local.get $2
   i32.load offset=12
   i32.const 1
   i32.add
   local.tee $0
   i32.const 1
   call $~lib/array/ensureCapacity
   local.get $2
   i32.load offset=4
   local.tee $3
   i32.const 4
   i32.add
   local.get $3
   local.get $0
   i32.const 1
   i32.sub
   i32.const 2
   i32.shl
   call $~lib/memory/memory.copy
   local.get $3
   f32.const 4
   f32.store
   local.get $2
   local.get $0
   i32.store offset=12
   i32.const 0
   i32.const 26
   i32.const 5136
   call $~lib/rt/__newArray
   global.set $logic/bullets-manager/bullets_representation
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   local.get $1
   local.get $2
   call $~lib/array/Array<f32>#concat
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   call $logic/index/toFloat32Array
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/index/createSquad (param $0 i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i32.const 0
  i32.store
  local.get $1
  global.get $logic/index/userFaction
  i32.load
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  call $logic/factory/Factory#addSquadDoProduction
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/squads-grid-manager/traceLine (param $0 i32) (param $1 i32) (result i32)
  (local $2 f32)
  (local $3 f32)
  (local $4 f32)
  (local $5 f32)
  (local $6 f32)
  (local $7 f32)
  (local $8 i32)
  (local $9 f32)
  (local $10 f32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 36
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $8
  i64.const 0
  i64.store
  local.get $8
  i64.const 0
  i64.store offset=8
  local.get $8
  i64.const 0
  i64.store offset=16
  local.get $8
  i64.const 0
  i64.store offset=24
  local.get $8
  i32.const 0
  i32.store offset=32
  local.get $8
  local.get $0
  call $logic/squads-grid-manager/pointToGridFnc
  local.tee $11
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  call $logic/squads-grid-manager/pointToGridFnc
  local.tee $12
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $8
  i32.store offset=8
  local.get $8
  local.get $1
  f32.load
  local.get $0
  f32.load
  f32.sub
  f32.store
  local.get $8
  local.get $1
  f32.load offset=4
  local.get $0
  f32.load offset=4
  f32.sub
  f32.store offset=4
  local.get $8
  i32.store offset=12
  f32.const 1
  f32.const -1
  local.get $8
  f32.load
  local.tee $2
  f32.const 0
  f32.ge
  select
  local.set $6
  f32.const 1
  f32.const -1
  local.get $8
  f32.load offset=4
  local.tee $3
  f32.const 0
  f32.ge
  select
  local.set $7
  local.get $2
  local.get $3
  call $~lib/math/NativeMathf.hypot
  local.set $2
  global.get $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $13
  i32.store offset=16
  local.get $13
  local.get $8
  f32.load
  local.get $2
  f32.div
  f32.store
  local.get $13
  local.get $8
  f32.load offset=4
  local.get $2
  f32.div
  f32.store offset=4
  local.get $13
  i32.store offset=20
  local.get $6
  f32.const 0
  f32.gt
  if (result f32)
   local.get $11
   f32.load
   f32.const 1
   f32.add
   global.get $logic/squads-grid-manager/gridMapScaleX
   f32.div
   local.get $0
   f32.load
   f32.sub
  else
   local.get $0
   f32.load
   local.get $11
   f32.load
   global.get $logic/squads-grid-manager/gridMapScaleX
   f32.div
   f32.sub
  end
  local.set $2
  local.get $7
  f32.const 0
  f32.gt
  if (result f32)
   local.get $11
   f32.load offset=4
   f32.const 1
   f32.add
   global.get $logic/squads-grid-manager/gridMapScaleY
   f32.div
   local.get $0
   f32.load offset=4
   f32.sub
  else
   local.get $0
   f32.load offset=4
   local.get $11
   f32.load offset=4
   global.get $logic/squads-grid-manager/gridMapScaleY
   f32.div
   f32.sub
  end
  local.set $3
  local.get $13
  f32.load
  f32.const 0
  f32.ne
  if (result f32)
   local.get $2
   local.get $13
   f32.load
   f32.div
  else
   f32.const inf
  end
  local.set $2
  local.get $13
  f32.load offset=4
  f32.const 0
  f32.ne
  if (result f32)
   local.get $3
   local.get $13
   f32.load offset=4
   f32.div
  else
   f32.const inf
  end
  local.set $3
  local.get $13
  f32.load
  f32.const 0
  f32.ne
  if (result f32)
   f32.const 1
   global.get $logic/squads-grid-manager/gridMapScaleX
   f32.div
   local.get $13
   f32.load
   f32.div
  else
   f32.const inf
  end
  local.set $9
  local.get $13
  f32.load offset=4
  f32.const 0
  f32.ne
  if (result f32)
   f32.const 1
   global.get $logic/squads-grid-manager/gridMapScaleY
   f32.div
   local.get $13
   f32.load offset=4
   f32.div
  else
   f32.const inf
  end
  local.set $10
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 32
  i32.const 5168
  call $~lib/rt/__newArray
  local.tee $1
  i32.store offset=24
  local.get $1
  local.get $11
  call $~lib/array/Array<logic/geom-types/Point>#push
  local.get $12
  f32.load
  local.get $11
  f32.load
  local.tee $4
  f32.sub
  f32.abs
  i32.trunc_f32_u
  local.set $8
  local.get $12
  f32.load offset=4
  local.get $11
  f32.load offset=4
  local.tee $5
  f32.sub
  f32.abs
  i32.trunc_f32_u
  local.set $11
  i32.const 0
  local.set $0
  loop $while-continue|0
   local.get $8
   local.get $11
   i32.add
   local.get $0
   i32.ne
   if
    local.get $2
    f32.abs
    local.get $3
    f32.abs
    f32.lt
    if
     local.get $2
     local.get $9
     f32.add
     local.set $2
     local.get $4
     local.get $6
     f32.add
     local.set $4
    else
     local.get $3
     local.get $10
     f32.add
     local.set $3
     local.get $5
     local.get $7
     f32.add
     local.set $5
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    global.get $~lib/memory/__stack_pointer
    i32.const 0
    call $logic/geom-types/Point#constructor
    local.tee $12
    i32.store offset=32
    local.get $12
    local.get $4
    f32.store
    local.get $12
    local.get $5
    f32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $12
    i32.store offset=28
    local.get $1
    local.get $12
    call $~lib/array/Array<logic/geom-types/Point>#push
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 36
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $logic/squads-grid-manager/pickCellIndexesInPolygon (param $0 i32) (result i32)
  (local $1 f32)
  (local $2 f32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 32
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $5
  i64.const 0
  i64.store
  local.get $5
  i64.const 0
  i64.store offset=8
  local.get $5
  i64.const 0
  i64.store offset=16
  local.get $5
  i64.const 0
  i64.store offset=24
  f32.const -inf
  local.set $1
  f32.const inf
  local.set $2
  loop $for-loop|0
   local.get $0
   i32.load offset=12
   local.get $3
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.tee $5
    local.get $0
    i32.load offset=4
    local.get $3
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $6
    i32.store
    local.get $5
    local.get $6
    call $logic/squads-grid-manager/pointToGridFnc
    local.tee $5
    i32.store offset=4
    local.get $5
    f32.load offset=4
    local.get $2
    f32.lt
    if
     local.get $5
     f32.load offset=4
     local.set $2
    end
    local.get $5
    f32.load offset=4
    local.get $1
    f32.gt
    if
     local.get $5
     f32.load offset=4
     local.set $1
    end
    local.get $3
    i32.const 1
    i32.add
    local.set $3
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.trunc_f32_s
  local.get $2
  i32.trunc_f32_s
  local.tee $6
  i32.sub
  i32.const 1
  i32.add
  local.tee $5
  call $~lib/array/Array<i32>#constructor
  local.set $8
  global.get $~lib/memory/__stack_pointer
  local.get $8
  i32.store
  local.get $8
  i32.load offset=4
  local.set $9
  i32.const 0
  local.get $8
  i32.load offset=12
  local.tee $10
  local.get $10
  i32.const 0
  i32.gt_s
  select
  local.set $3
  loop $for-loop|00
   local.get $3
   local.get $10
   i32.lt_s
   if
    local.get $3
    i32.const 2
    i32.shl
    local.get $9
    i32.add
    i32.const -100
    i32.store
    local.get $3
    i32.const 1
    i32.add
    local.set $3
    br $for-loop|00
   end
  end
  local.get $8
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $5
  call $~lib/array/Array<i32>#constructor
  local.set $9
  global.get $~lib/memory/__stack_pointer
  local.get $9
  i32.store
  local.get $9
  i32.load offset=4
  local.set $10
  i32.const 0
  local.get $9
  i32.load offset=12
  local.tee $11
  local.get $11
  i32.const 0
  i32.gt_s
  select
  local.set $3
  loop $for-loop|02
   local.get $3
   local.get $11
   i32.lt_s
   if
    local.get $3
    i32.const 2
    i32.shl
    local.get $10
    i32.add
    i32.const -100
    i32.store
    local.get $3
    i32.const 1
    i32.add
    local.set $3
    br $for-loop|02
   end
  end
  local.get $9
  i32.store offset=12
  loop $for-loop|1
   local.get $0
   i32.load offset=12
   local.get $4
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.tee $3
    local.get $0
    i32.load offset=4
    local.get $4
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $7
    i32.store
    local.get $3
    local.get $0
    i32.load offset=4
    local.get $4
    i32.const 1
    i32.add
    local.get $0
    i32.load offset=12
    i32.rem_s
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $10
    i32.store offset=16
    local.get $3
    local.get $7
    local.get $10
    call $logic/squads-grid-manager/traceLine
    local.tee $7
    i32.store offset=20
    i32.const 0
    local.set $3
    loop $for-loop|2
     local.get $7
     i32.load offset=12
     local.get $3
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $7
      i32.load offset=4
      local.get $3
      i32.const 2
      i32.shl
      i32.add
      i32.load
      local.tee $10
      i32.store offset=24
      local.get $10
      f32.load
      i32.trunc_f32_s
      local.set $11
      local.get $8
      i32.load offset=4
      local.get $10
      f32.load offset=4
      i32.trunc_f32_s
      local.get $6
      i32.sub
      local.tee $10
      i32.const 2
      i32.shl
      i32.add
      i32.load
      i32.const -100
      i32.eq
      if
       local.get $10
       i32.const 2
       i32.shl
       local.tee $10
       local.get $8
       i32.load offset=4
       i32.add
       local.get $11
       i32.store
       local.get $10
       local.get $9
       i32.load offset=4
       i32.add
       local.get $11
       i32.store
      else
       local.get $8
       i32.load offset=4
       local.get $10
       i32.const 2
       i32.shl
       i32.add
       i32.load
       local.get $11
       i32.gt_s
       if
        local.get $8
        i32.load offset=4
        local.get $10
        i32.const 2
        i32.shl
        i32.add
        local.get $11
        i32.store
       end
       local.get $9
       i32.load offset=4
       local.get $10
       i32.const 2
       i32.shl
       i32.add
       i32.load
       local.get $11
       i32.lt_s
       if
        local.get $9
        i32.load offset=4
        local.get $10
        i32.const 2
        i32.shl
        i32.add
        local.get $11
        i32.store
       end
      end
      local.get $3
      i32.const 1
      i32.add
      local.set $3
      br $for-loop|2
     end
    end
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|1
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 34
  i32.const 5200
  call $~lib/rt/__newArray
  local.tee $3
  i32.store offset=28
  i32.const -1
  local.set $4
  loop $for-loop|3
   local.get $4
   local.get $5
   i32.le_s
   if
    local.get $4
    f32.convert_i32_s
    f32.const 0
    f32.max
    local.get $5
    f32.convert_i32_s
    f32.const 1
    f32.sub
    f32.min
    i32.trunc_f32_s
    i32.const 2
    i32.shl
    local.tee $7
    local.get $8
    i32.load offset=4
    i32.add
    i32.load
    f32.convert_i32_s
    f32.const 1
    f32.sub
    f32.const 0
    f32.max
    i32.trunc_f32_s
    local.set $0
    local.get $9
    i32.load offset=4
    local.get $7
    i32.add
    i32.load
    f32.convert_i32_s
    f32.const 1
    f32.add
    global.get $logic/squads-grid-manager/gridMapWidth
    f32.convert_i32_s
    f32.const 1
    f32.sub
    f32.min
    i32.trunc_f32_s
    local.set $7
    local.get $4
    local.get $6
    i32.add
    f32.convert_i32_s
    f32.const 0
    f32.max
    global.get $logic/squads-grid-manager/gridMapHeight
    f32.convert_i32_s
    f32.const 1
    f32.sub
    f32.min
    i32.trunc_f32_s
    local.set $10
    loop $for-loop|4
     local.get $0
     local.get $7
     i32.le_s
     if
      local.get $3
      local.get $0
      global.get $logic/squads-grid-manager/gridMapWidth
      local.get $10
      i32.mul
      i32.add
      call $~lib/array/Array<u32>#push
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      br $for-loop|4
     end
    end
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|3
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 32
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $3
 )
 (func $logic/squads-grid-manager/getSquadsFromGridByPolygon~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i64.const 0
  i64.store
  local.get $2
  global.get $logic/squads-grid-manager/grid
  local.tee $1
  i32.store
  local.get $2
  local.get $1
  i32.load offset=4
  local.get $0
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $0
  i32.store offset=4
  local.get $0
  i32.eqz
  if
   i32.const 0
   i32.const 23
   i32.const 5232
   call $~lib/rt/__newArray
   local.set $0
  end
  local.get $2
  local.get $0
  i32.store offset=4
  local.get $0
  i32.eqz
  if
   i32.const 3872
   i32.const 4352
   i32.const 195
   i32.const 15
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $logic/squads-grid-manager/getSquadsFromGridByPolygon (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $1
  local.get $0
  call $logic/squads-grid-manager/pickCellIndexesInPolygon
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 5264
  i32.store offset=8
  local.get $0
  i32.const 5264
  call $~lib/array/Array<i32>#map<~lib/array/Array<logic/squad/Squad>>
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  local.get $0
  call $~lib/array/Array<~lib/array/Array<logic/squad/Squad>>#flat
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/hex-positions/getSquadsDividedByRangeAndLocalization (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $2
   i64.const 0
   i64.store
   local.get $2
   i64.const 0
   i64.store offset=8
   local.get $2
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $3
   i32.const 0
   i32.store
   i32.const 0
   local.get $0
   i32.load offset=12
   local.tee $4
   local.get $4
   i32.const 0
   i32.gt_s
   select
   local.set $5
   local.get $3
   local.get $4
   local.get $5
   i32.sub
   local.tee $3
   i32.const 0
   local.get $3
   i32.const 0
   i32.gt_s
   select
   local.tee $3
   i32.const 23
   i32.const 0
   call $~lib/rt/__newArray
   local.tee $4
   i32.store
   local.get $4
   i32.load offset=4
   local.set $6
   local.get $0
   i32.load offset=4
   local.get $5
   i32.const 2
   i32.shl
   i32.add
   local.set $0
   local.get $3
   i32.const 2
   i32.shl
   local.set $3
   loop $while-continue|0
    local.get $1
    local.get $3
    i32.lt_u
    if
     local.get $1
     local.get $6
     i32.add
     local.get $0
     local.get $1
     i32.add
     i32.load
     local.tee $5
     i32.store
     local.get $5
     if
      local.get $4
      local.get $5
      i32.const 1
      call $byn-split-outlined-A$~lib/rt/itcms/__link
     end
     local.get $1
     i32.const 4
     i32.add
     local.set $1
     br $while-continue|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $2
   local.get $4
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 59
   i32.const 5392
   call $~lib/rt/__newArray
   local.tee $2
   i32.store offset=4
   loop $while-continue|01
    local.get $4
    i32.load offset=12
    if
     global.get $~lib/memory/__stack_pointer
     local.tee $0
     i32.const 4
     i32.sub
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 6788
     i32.lt_s
     br_if $folding-inner0
     global.get $~lib/memory/__stack_pointer
     local.tee $1
     i32.const 0
     i32.store
     i32.const 0
     local.get $4
     i32.load offset=12
     local.tee $3
     local.get $3
     i32.const 0
     i32.gt_s
     select
     local.set $5
     local.get $1
     i32.const 1
     local.get $3
     local.get $5
     i32.sub
     local.tee $1
     local.get $1
     i32.const 1
     i32.gt_s
     select
     local.tee $1
     i32.const 0
     local.get $1
     i32.const 0
     i32.gt_s
     select
     local.tee $1
     i32.const 23
     i32.const 0
     call $~lib/rt/__newArray
     local.tee $6
     i32.store
     local.get $6
     i32.load offset=4
     local.get $4
     i32.load offset=4
     local.tee $7
     local.get $5
     i32.const 2
     i32.shl
     i32.add
     local.tee $8
     local.get $1
     i32.const 2
     i32.shl
     call $~lib/memory/memory.copy
     local.get $3
     local.get $1
     local.get $5
     i32.add
     local.tee $5
     i32.ne
     if
      local.get $8
      local.get $5
      i32.const 2
      i32.shl
      local.get $7
      i32.add
      local.get $3
      local.get $5
      i32.sub
      i32.const 2
      i32.shl
      call $~lib/memory/memory.copy
     end
     local.get $4
     local.get $3
     local.get $1
     i32.sub
     i32.store offset=12
     global.get $~lib/memory/__stack_pointer
     i32.const 4
     i32.add
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.store offset=8
     local.get $0
     local.get $6
     i32.load offset=4
     i32.load
     local.tee $3
     i32.store offset=12
     global.get $~lib/memory/__stack_pointer
     i32.const 20
     i32.sub
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 6788
     i32.lt_s
     br_if $folding-inner0
     global.get $~lib/memory/__stack_pointer
     local.tee $0
     i64.const 0
     i64.store
     local.get $0
     i64.const 0
     i64.store offset=8
     local.get $0
     i32.const 0
     i32.store offset=16
     i32.const 0
     local.set $1
     block $__inlined_func$logic/hex-positions/addSquadToDividedGroup
      loop $for-loop|0
       local.get $2
       i32.load offset=12
       local.get $1
       i32.gt_s
       if
        global.get $~lib/memory/__stack_pointer
        local.get $2
        local.get $1
        call $~lib/array/Array<logic/geom-types/Point>#__get
        local.tee $5
        i32.store
        i32.const 0
        local.set $0
        loop $for-loop|1
         local.get $5
         i32.load offset=12
         local.get $0
         i32.gt_s
         if
          global.get $~lib/memory/__stack_pointer
          local.get $5
          local.get $0
          call $~lib/array/Array<logic/geom-types/Point>#__get
          local.tee $6
          i32.store offset=4
          local.get $3
          i32.load offset=36
          local.tee $7
          f32.load
          local.get $6
          i32.load offset=36
          local.tee $8
          f32.load
          f32.sub
          local.get $7
          f32.load offset=4
          local.get $8
          f32.load offset=4
          f32.sub
          call $~lib/math/NativeMathf.hypot
          f32.const 360
          f32.lt
          if
           local.get $3
           i32.load offset=44
           f32.load offset=4
           local.get $6
           i32.load offset=44
           f32.load offset=4
           f32.sub
           f32.abs
           f32.const 1.1920928955078125e-07
           f32.lt
           if
            local.get $5
            local.get $3
            call $~lib/array/Array<logic/geom-types/Point>#push
            br $__inlined_func$logic/hex-positions/addSquadToDividedGroup
           end
          end
          local.get $0
          i32.const 1
          i32.add
          local.set $0
          br $for-loop|1
         end
        end
        local.get $1
        i32.const 1
        i32.add
        local.set $1
        br $for-loop|0
       end
      end
      global.get $~lib/memory/__stack_pointer
      i32.const 1
      i32.const 23
      i32.const 0
      call $~lib/rt/__newArray
      local.tee $0
      i32.store offset=12
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load offset=4
      i32.store offset=16
      local.get $0
      i32.const 0
      local.get $3
      call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      local.get $2
      local.get $0
      call $~lib/array/Array<logic/geom-types/Point>#push
     end
     global.get $~lib/memory/__stack_pointer
     i32.const 20
     i32.add
     global.set $~lib/memory/__stack_pointer
     br $while-continue|01
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $2
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $~lib/util/sort/extendRunRight<logic/geom-types/Point> (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $4
  i64.const 0
  i64.store
  local.get $4
  i32.const 0
  i32.store offset=8
  local.get $1
  local.get $2
  i32.eq
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $1
   return
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $4
  local.get $1
  i32.const 2
  i32.shl
  local.get $0
  i32.add
  i32.load
  local.tee $5
  i32.store
  local.get $4
  local.get $1
  i32.const 1
  i32.add
  local.tee $4
  i32.const 2
  i32.shl
  local.get $0
  i32.add
  i32.load
  local.tee $6
  i32.store offset=4
  local.get $5
  local.get $6
  local.get $3
  i32.load
  call_indirect $0 (type $i32_i32_=>_i32)
  i32.const 0
  i32.gt_s
  if
   loop $while-continue|0
    local.get $2
    local.get $4
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.tee $6
     local.get $4
     i32.const 2
     i32.shl
     local.get $0
     i32.add
     local.tee $7
     i32.load offset=4
     local.tee $5
     i32.store
     local.get $6
     local.get $7
     i32.load
     local.tee $6
     i32.store offset=4
     local.get $5
     local.get $6
     local.get $3
     i32.load
     call_indirect $0 (type $i32_i32_=>_i32)
     i32.const 31
     i32.shr_u
    else
     i32.const 0
    end
    if
     local.get $4
     i32.const 1
     i32.add
     local.set $4
     br $while-continue|0
    end
   end
   local.get $4
   local.set $2
   loop $while-continue|1
    local.get $1
    local.get $2
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.const 2
     i32.shl
     local.get $0
     i32.add
     local.tee $3
     i32.load
     local.tee $5
     i32.store offset=8
     local.get $3
     local.get $2
     i32.const 2
     i32.shl
     local.get $0
     i32.add
     local.tee $3
     i32.load
     i32.store
     local.get $1
     i32.const 1
     i32.add
     local.set $1
     local.get $3
     local.get $5
     i32.store
     local.get $2
     i32.const 1
     i32.sub
     local.set $2
     br $while-continue|1
    end
   end
  else
   loop $while-continue|2
    local.get $2
    local.get $4
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.tee $1
     local.get $4
     i32.const 2
     i32.shl
     local.get $0
     i32.add
     local.tee $5
     i32.load offset=4
     local.tee $6
     i32.store
     local.get $1
     local.get $5
     i32.load
     local.tee $1
     i32.store offset=4
     local.get $6
     local.get $1
     local.get $3
     i32.load
     call_indirect $0 (type $i32_i32_=>_i32)
     i32.const 0
     i32.ge_s
    else
     i32.const 0
    end
    if
     local.get $4
     i32.const 1
     i32.add
     local.set $4
     br $while-continue|2
    end
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $4
 )
 (func $logic/hex-positions/getPositions (param $0 i32) (param $1 i32) (param $2 f32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 f32)
  (local $8 i32)
  (local $9 i32)
  (local $10 f32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $4
   i64.const 0
   i64.store
   local.get $4
   i32.const 20
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $5
   i64.const 0
   i64.store
   local.get $5
   i64.const 0
   i64.store offset=8
   local.get $5
   i32.const 0
   i32.store offset=16
   local.get $5
   i32.const 5424
   i32.store
   local.get $5
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $6
   i32.store offset=8
   local.get $6
   f32.const 0
   f32.store
   local.get $6
   f32.const 0
   f32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $6
   i32.store offset=4
   local.get $5
   local.get $0
   i32.const 5424
   local.get $6
   call $~lib/array/Array<logic/unit/Unit>#reduce<logic/geom-types/Point>
   local.tee $5
   i32.store offset=12
   local.get $0
   i32.load offset=12
   f32.convert_i32_s
   local.set $7
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $6
   i32.store offset=16
   local.get $6
   local.get $5
   f32.load
   local.get $7
   f32.div
   f32.store
   local.get $6
   local.get $5
   f32.load offset=4
   local.get $7
   f32.div
   f32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 20
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   local.get $6
   i32.store
   local.get $0
   i32.load offset=12
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 24
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $5
   i64.const 0
   i64.store
   local.get $5
   i64.const 0
   i64.store offset=8
   local.get $5
   i64.const 0
   i64.store offset=16
   local.get $2
   global.get $logic/attacker-positions/DISTANCE_BETWEEN_ATTACKERS
   f32.div
   i32.trunc_f32_s
   i32.const 1
   i32.sub
   local.set $8
   local.get $5
   i32.const 2176
   i32.store
   local.get $5
   i32.const 2180
   i32.load
   local.get $8
   i32.const 2
   i32.shl
   i32.add
   i32.load
   local.tee $8
   i32.store offset=4
   local.get $8
   i32.load offset=12
   local.set $9
   local.get $5
   i32.const 0
   i32.const 32
   i32.const 5456
   call $~lib/rt/__newArray
   local.tee $5
   i32.store offset=8
   local.get $6
   f32.load
   local.get $1
   f32.load
   f32.sub
   local.get $1
   f32.load offset=4
   local.get $6
   f32.load offset=4
   f32.sub
   call $~lib/math/NativeMathf.atan2
   local.set $7
   loop $while-continue|0
    local.get $5
    i32.load offset=12
    local.get $0
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $8
     i32.load offset=4
     local.get $3
     i32.const 2
     i32.shl
     i32.add
     i32.load
     local.tee $6
     i32.store offset=12
     local.get $7
     local.get $6
     f32.load
     f32.add
     call $~lib/math/NativeMathf.sin
     local.get $6
     f32.load offset=4
     f32.mul
     local.get $1
     f32.load
     f32.add
     local.tee $2
     local.get $7
     local.get $6
     f32.load
     f32.add
     call $~lib/math/NativeMathf.cos
     f32.neg
     local.get $6
     f32.load offset=4
     f32.mul
     local.get $1
     f32.load offset=4
     f32.add
     local.tee $10
     i32.const 1
     call $logic/obstacles-manager/getIsPointAvailable
     if
      global.get $~lib/memory/__stack_pointer
      i32.const 0
      call $logic/geom-types/Point#constructor
      local.tee $6
      i32.store offset=20
      local.get $6
      local.get $2
      f32.store
      local.get $6
      local.get $10
      f32.store offset=4
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store offset=16
      local.get $5
      local.get $6
      call $~lib/array/Array<logic/geom-types/Point>#push
     end
     local.get $3
     i32.const 1
     i32.add
     local.get $9
     i32.rem_s
     local.set $3
     br $while-continue|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 24
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $4
   local.get $5
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 5488
   i32.store
   local.get $5
   i32.load offset=4
   local.get $5
   i32.load offset=12
   i32.const 5488
   call $~lib/util/sort/SORT<logic/geom-types/Point>
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $5
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/index/getSquadsDestinations (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 28
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  i64.const 0
  i64.store offset=8
  local.get $1
  i64.const 0
  i64.store offset=16
  local.get $1
  i32.const 0
  i32.store offset=24
  local.get $1
  i32.const 0
  i32.const 46
  i32.const 5584
  call $~lib/rt/__newArray
  local.tee $3
  i32.store
  loop $for-loop|0
   global.get $~lib/memory/__stack_pointer
   global.get $logic/index/userFaction
   i32.load offset=4
   local.tee $1
   i32.store offset=4
   local.get $1
   i32.load offset=12
   local.get $4
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.tee $1
    global.get $logic/index/userFaction
    i32.load offset=4
    local.tee $2
    i32.store offset=4
    local.get $1
    local.get $2
    local.get $4
    call $~lib/array/Array<logic/geom-types/Point>#__get
    local.tee $8
    i32.store offset=8
    local.get $8
    i32.load
    local.set $5
    i32.const 0
    local.set $2
    i32.const -1
    local.set $1
    block $~lib/typedarray/INDEX_OF<~lib/typedarray/Uint32Array,u32>|inlined.0
     local.get $0
     i32.load offset=8
     i32.const 2
     i32.shr_u
     local.tee $6
     i32.eqz
     br_if $~lib/typedarray/INDEX_OF<~lib/typedarray/Uint32Array,u32>|inlined.0
     local.get $0
     i32.load offset=4
     local.set $7
     loop $while-continue|0
      local.get $2
      local.get $6
      i32.lt_s
      if
       local.get $5
       local.get $2
       local.tee $1
       i32.const 2
       i32.shl
       local.get $7
       i32.add
       i32.load
       i32.eq
       br_if $~lib/typedarray/INDEX_OF<~lib/typedarray/Uint32Array,u32>|inlined.0
       local.get $1
       i32.const 1
       i32.add
       local.set $2
       br $while-continue|0
      end
     end
     i32.const -1
     local.set $1
    end
    local.get $1
    i32.const 0
    i32.ge_s
    if
     global.get $~lib/memory/__stack_pointer
     local.tee $2
     local.get $8
     i32.load offset=36
     local.tee $1
     i32.store offset=12
     local.get $2
     local.get $8
     i32.load offset=8
     i32.load
     local.tee $2
     i32.store offset=16
     local.get $2
     i32.const 0
     local.get $8
     i32.load8_u offset=6
     select
     if
      local.get $2
      local.set $1
     else
      global.get $~lib/memory/__stack_pointer
      local.get $8
      i32.load offset=32
      local.tee $2
      i32.store offset=4
      local.get $2
      i32.load offset=12
      i32.const 0
      i32.gt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.tee $1
       local.get $8
       i32.load offset=32
       local.tee $2
       i32.store offset=4
       local.get $1
       local.get $8
       i32.load offset=32
       local.tee $5
       i32.store offset=20
       local.get $1
       local.get $2
       local.get $5
       i32.load offset=12
       i32.const 1
       i32.sub
       call $~lib/array/Array<logic/geom-types/Point>#__get
       local.tee $1
       i32.store offset=12
      end
     end
     global.get $~lib/memory/__stack_pointer
     local.get $1
     f32.load
     local.get $1
     f32.load offset=4
     call $logic/convert-coords-between-logic-and-visual/convertLogicCoordsToVisual
     local.tee $1
     i32.store offset=24
     local.get $3
     local.get $1
     f32.load
     call $~lib/array/Array<f32>#push
     local.get $3
     local.get $1
     f32.load offset=4
     call $~lib/array/Array<f32>#push
    end
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 28
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $3
 )
 (func $logic/index/moveUnits (param $0 i32) (param $1 f32) (param $2 f32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner2
   block $folding-inner1
    global.get $~lib/memory/__stack_pointer
    i32.const 6788
    i32.lt_s
    br_if $folding-inner1
    global.get $~lib/memory/__stack_pointer
    local.tee $4
    i64.const 0
    i64.store
    local.get $4
    i64.const 0
    i64.store offset=8
    local.get $4
    i64.const 0
    i64.store offset=16
    local.get $4
    local.get $1
    local.get $2
    call $logic/convert-coords-between-logic-and-visual/convertVisualCoordsToLogic
    local.tee $9
    i32.store
    local.get $9
    f32.load
    local.get $9
    f32.load offset=4
    i32.const 0
    call $logic/obstacles-manager/getIsPointAvailable
    i32.eqz
    if
     i32.const 0
     call $~lib/typedarray/Float32Array#constructor
     local.set $0
     br $folding-inner2
    end
    global.get $~lib/memory/__stack_pointer
    local.tee $4
    local.get $4
    i32.const 24
    i32.sub
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    i32.const 6788
    i32.lt_s
    br_if $folding-inner1
    global.get $~lib/memory/__stack_pointer
    local.tee $4
    i64.const 0
    i64.store
    local.get $4
    i64.const 0
    i64.store offset=8
    local.get $4
    i64.const 0
    i64.store offset=16
    local.get $4
    i32.const 1
    i32.const 32
    i32.const 0
    call $~lib/rt/__newArray
    local.tee $6
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.load offset=4
    i32.store offset=8
    local.get $6
    i32.const 0
    local.get $9
    call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.store
    local.get $4
    local.get $6
    call $logic/squads-grid-manager/getSquadsFromGridByPolygon
    local.tee $10
    i32.store offset=8
    block $__inlined_func$logic/index/getAttackedEnemy
     loop $for-loop|0
      local.get $10
      i32.load offset=12
      local.get $5
      i32.gt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.get $10
       i32.load offset=4
       local.get $5
       i32.const 2
       i32.shl
       i32.add
       i32.load
       local.tee $6
       i32.store offset=12
       local.get $6
       i32.load offset=48
       global.get $logic/index/userFaction
       i32.load offset=16
       i32.ne
       if
        local.get $6
        i32.load offset=40
        f32.load offset=16
        global.get $~lib/memory/__stack_pointer
        local.get $6
        call $logic/convert-coords-between-logic-and-visual/getUnitOffset
        local.tee $11
        i32.store offset=16
        f32.const 1.5
        f32.mul
        local.set $1
        i32.const 0
        local.set $4
        loop $for-loop|1
         global.get $~lib/memory/__stack_pointer
         local.get $6
         i32.load offset=16
         local.tee $12
         i32.store
         local.get $12
         i32.load offset=12
         local.get $4
         i32.gt_s
         if
          global.get $~lib/memory/__stack_pointer
          local.tee $12
          local.get $6
          i32.load offset=16
          local.tee $13
          i32.store
          local.get $12
          local.get $13
          i32.load offset=4
          local.get $4
          i32.const 2
          i32.shl
          i32.add
          i32.load
          local.tee $12
          i32.store offset=20
          local.get $12
          f32.load offset=44
          local.get $11
          f32.load
          f32.add
          local.get $9
          f32.load
          f32.sub
          local.get $12
          f32.load offset=48
          local.get $11
          f32.load offset=4
          f32.add
          local.get $9
          f32.load offset=4
          f32.sub
          call $~lib/math/NativeMathf.hypot
          local.get $1
          f32.lt
          if
           global.get $~lib/memory/__stack_pointer
           i32.const 24
           i32.add
           global.set $~lib/memory/__stack_pointer
           br $__inlined_func$logic/index/getAttackedEnemy
          end
          local.get $4
          i32.const 1
          i32.add
          local.set $4
          br $for-loop|1
         end
        end
       end
       local.get $5
       i32.const 1
       i32.add
       local.set $5
       br $for-loop|0
      end
     end
     global.get $~lib/memory/__stack_pointer
     i32.const 24
     i32.add
     global.set $~lib/memory/__stack_pointer
     i32.const 0
     local.set $6
    end
    local.get $6
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    i32.const 0
    i32.const 46
    i32.const 5296
    call $~lib/rt/__newArray
    local.tee $7
    i32.store offset=8
    local.get $6
    if
     global.get $~lib/memory/__stack_pointer
     local.tee $4
     global.get $logic/index/userFaction
     local.tee $7
     i32.store offset=12
     local.get $4
     i32.const 12
     i32.sub
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 6788
     i32.lt_s
     br_if $folding-inner1
     global.get $~lib/memory/__stack_pointer
     local.tee $4
     i64.const 0
     i64.store
     local.get $4
     i32.const 0
     i32.store offset=8
     local.get $4
     i32.const 0
     i32.const 23
     i32.const 5328
     call $~lib/rt/__newArray
     local.tee $9
     i32.store
     loop $for-loop|00
      global.get $~lib/memory/__stack_pointer
      local.get $7
      i32.load offset=4
      local.tee $4
      i32.store offset=4
      local.get $4
      i32.load offset=12
      local.get $3
      i32.gt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.tee $4
       local.get $7
       i32.load offset=4
       local.tee $5
       i32.store offset=4
       local.get $4
       local.get $5
       i32.load offset=4
       local.get $3
       i32.const 2
       i32.shl
       i32.add
       i32.load
       local.tee $10
       i32.store offset=8
       local.get $10
       i32.load
       local.set $11
       i32.const 0
       local.set $5
       i32.const -1
       local.set $4
       block $~lib/typedarray/INDEX_OF<~lib/typedarray/Uint32Array,u32>|inlined.0
        local.get $0
        i32.load offset=8
        i32.const 2
        i32.shr_u
        local.tee $12
        i32.eqz
        br_if $~lib/typedarray/INDEX_OF<~lib/typedarray/Uint32Array,u32>|inlined.0
        local.get $0
        i32.load offset=4
        local.set $13
        loop $while-continue|0
         local.get $5
         local.get $12
         i32.lt_s
         if
          local.get $11
          local.get $5
          local.tee $4
          i32.const 2
          i32.shl
          local.get $13
          i32.add
          i32.load
          i32.eq
          br_if $~lib/typedarray/INDEX_OF<~lib/typedarray/Uint32Array,u32>|inlined.0
          local.get $4
          i32.const 1
          i32.add
          local.set $5
          br $while-continue|0
         end
        end
        i32.const -1
        local.set $4
       end
       local.get $4
       i32.const 0
       i32.ge_s
       if
        local.get $9
        local.get $10
        call $~lib/array/Array<logic/geom-types/Point>#push
       end
       local.get $3
       i32.const 1
       i32.add
       local.set $3
       br $for-loop|00
      end
     end
     global.get $~lib/memory/__stack_pointer
     i32.const 32
     i32.sub
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 6788
     i32.lt_s
     br_if $folding-inner1
     global.get $~lib/memory/__stack_pointer
     local.tee $3
     i64.const 0
     i64.store
     local.get $3
     i64.const 0
     i64.store offset=8
     local.get $3
     i64.const 0
     i64.store offset=16
     local.get $3
     i64.const 0
     i64.store offset=24
     local.get $3
     i32.const 0
     i32.const 23
     i32.const 5360
     call $~lib/rt/__newArray
     local.tee $3
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.load offset=36
     local.tee $4
     i32.store offset=4
     loop $for-loop|01
      local.get $9
      i32.load offset=12
      local.get $8
      i32.gt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.get $9
       local.get $8
       call $~lib/array/Array<logic/geom-types/Point>#__get
       local.tee $5
       i32.store offset=8
       local.get $5
       i32.load offset=36
       local.tee $7
       f32.load
       local.get $4
       f32.load
       f32.sub
       local.get $7
       f32.load offset=4
       local.get $4
       f32.load offset=4
       f32.sub
       call $~lib/math/NativeMathf.hypot
       local.get $5
       i32.load offset=44
       f32.load offset=4
       f32.const 60
       f32.sub
       f32.gt
       if
        local.get $3
        local.get $5
        call $~lib/array/Array<logic/geom-types/Point>#push
       else
        local.get $5
        i32.const 0
        local.get $6
        i32.const 0
        call $logic/squad/Squad#setTask
       end
       local.get $8
       i32.const 1
       i32.add
       local.set $8
       br $for-loop|01
      end
     end
     global.get $~lib/memory/__stack_pointer
     local.get $3
     call $logic/hex-positions/getSquadsDividedByRangeAndLocalization
     local.tee $3
     i32.store offset=12
     i32.const 0
     local.set $7
     loop $for-loop|12
      local.get $3
      i32.load offset=12
      local.get $7
      i32.gt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.tee $4
       local.get $3
       i32.load offset=4
       local.get $7
       i32.const 2
       i32.shl
       i32.add
       i32.load
       local.tee $5
       i32.store offset=16
       local.get $4
       local.get $6
       i32.load offset=36
       local.tee $8
       i32.store offset=20
       local.get $4
       local.get $5
       local.get $8
       local.get $5
       i32.load offset=4
       i32.load
       i32.load offset=44
       f32.load offset=4
       f32.const 60
       f32.sub
       call $logic/hex-positions/getPositions
       local.tee $8
       i32.store offset=24
       global.get $~lib/memory/__stack_pointer
       i32.const 5520
       i32.store offset=20
       local.get $5
       i32.load offset=4
       local.get $5
       i32.load offset=12
       i32.const 5520
       call $~lib/util/sort/SORT<logic/geom-types/Point>
       i32.const 0
       local.set $4
       loop $for-loop|2
        local.get $9
        i32.load offset=12
        local.get $4
        i32.gt_s
        if
         global.get $~lib/memory/__stack_pointer
         local.tee $5
         local.get $4
         i32.const 2
         i32.shl
         local.tee $10
         local.get $9
         i32.load offset=4
         i32.add
         i32.load
         local.tee $11
         i32.store offset=28
         local.get $5
         local.get $10
         local.get $8
         i32.load offset=4
         i32.add
         i32.load
         local.tee $5
         i32.store offset=20
         local.get $11
         local.get $5
         local.get $6
         i32.const 0
         call $logic/squad/Squad#setTask
         local.get $4
         i32.const 1
         i32.add
         local.set $4
         br $for-loop|2
        end
       end
       local.get $7
       i32.const 1
       i32.add
       local.set $7
       br $for-loop|12
      end
     end
     global.get $~lib/memory/__stack_pointer
     i32.const 32
     i32.add
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 12
     i32.add
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.load offset=16
     local.tee $4
     i32.store offset=12
     global.get $~lib/memory/__stack_pointer
     i32.const 5552
     i32.store offset=16
     global.get $~lib/memory/__stack_pointer
     i32.const 8
     i32.sub
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 6788
     i32.lt_s
     br_if $folding-inner1
     global.get $~lib/memory/__stack_pointer
     local.tee $5
     i64.const 0
     i64.store
     local.get $5
     local.get $4
     i32.load offset=12
     local.tee $5
     i32.const 46
     i32.const 0
     call $~lib/rt/__newArray
     local.tee $7
     i32.store
     local.get $7
     i32.load offset=4
     local.set $6
     i32.const 0
     local.set $8
     loop $for-loop|03
      local.get $5
      local.get $4
      i32.load offset=12
      local.tee $9
      local.get $5
      local.get $9
      i32.lt_s
      select
      local.get $8
      i32.gt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.get $8
       i32.const 2
       i32.shl
       local.tee $9
       local.get $4
       i32.load offset=4
       i32.add
       i32.load
       local.tee $10
       i32.store offset=4
       local.get $6
       local.get $9
       i32.add
       local.get $10
       local.get $8
       local.get $4
       i32.const 5552
       i32.load
       call_indirect $0 (type $i32_i32_i32_=>_f32)
       f32.store
       local.get $8
       i32.const 1
       i32.add
       local.set $8
       br $for-loop|03
      end
     end
     global.get $~lib/memory/__stack_pointer
     i32.const 8
     i32.add
     global.set $~lib/memory/__stack_pointer
     local.get $7
     i32.store offset=8
    else
     global.get $~lib/memory/__stack_pointer
     local.tee $4
     global.get $logic/index/userFaction
     local.tee $8
     i32.store offset=12
     local.get $4
     i32.const 16
     i32.sub
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 6788
     i32.lt_s
     br_if $folding-inner1
     global.get $~lib/memory/__stack_pointer
     local.tee $4
     i64.const 0
     i64.store
     local.get $4
     i64.const 0
     i64.store offset=8
     local.get $4
     local.get $0
     i32.load offset=8
     i32.const 2
     i32.shr_u
     local.get $9
     f32.load
     local.get $9
     f32.load offset=4
     call $logic/hex-positions/getSquadPositions
     local.tee $9
     i32.store
     i32.const 0
     local.set $5
     loop $for-loop|07
      global.get $~lib/memory/__stack_pointer
      local.get $8
      i32.load offset=4
      local.tee $4
      i32.store offset=4
      local.get $4
      i32.load offset=12
      local.get $5
      i32.gt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.tee $4
       local.get $8
       i32.load offset=4
       local.tee $6
       i32.store offset=4
       local.get $4
       local.get $6
       i32.load offset=4
       local.get $5
       i32.const 2
       i32.shl
       i32.add
       i32.load
       local.tee $10
       i32.store offset=8
       local.get $10
       i32.load
       local.set $11
       i32.const 0
       local.set $6
       i32.const -1
       local.set $4
       block $~lib/typedarray/INDEX_OF<~lib/typedarray/Uint32Array,u32>|inlined.02
        local.get $0
        i32.load offset=8
        i32.const 2
        i32.shr_u
        local.tee $12
        i32.eqz
        br_if $~lib/typedarray/INDEX_OF<~lib/typedarray/Uint32Array,u32>|inlined.02
        local.get $0
        i32.load offset=4
        local.set $13
        loop $while-continue|03
         local.get $6
         local.get $12
         i32.lt_s
         if
          local.get $11
          local.get $6
          local.tee $4
          i32.const 2
          i32.shl
          local.get $13
          i32.add
          i32.load
          i32.eq
          br_if $~lib/typedarray/INDEX_OF<~lib/typedarray/Uint32Array,u32>|inlined.02
          local.get $4
          i32.const 1
          i32.add
          local.set $6
          br $while-continue|03
         end
        end
        i32.const -1
        local.set $4
       end
       local.get $4
       i32.const 0
       i32.ge_s
       if
        global.get $~lib/memory/__stack_pointer
        local.get $9
        i32.load offset=4
        local.get $3
        i32.const 2
        i32.shl
        i32.add
        i32.load
        local.tee $4
        i32.store offset=12
        local.get $10
        local.get $4
        i32.const 0
        i32.const 0
        call $logic/squad/Squad#setTask
        local.get $3
        i32.const 1
        i32.add
        local.set $3
       end
       local.get $5
       i32.const 1
       i32.add
       local.set $5
       br $for-loop|07
      end
     end
     global.get $~lib/memory/__stack_pointer
     i32.const 16
     i32.add
     global.set $~lib/memory/__stack_pointer
    end
    local.get $7
    f32.const 0
    call $~lib/array/Array<f32>#push
    global.get $~lib/memory/__stack_pointer
    local.get $0
    call $logic/index/getSquadsDestinations
    local.tee $0
    i32.store offset=20
    local.get $7
    local.get $0
    call $~lib/array/Array<f32>#concat
    local.set $0
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=12
    local.get $0
    call $logic/index/toFloat32Array
    local.set $0
    br $folding-inner2
   end
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/array/Array<logic/squad/Squad>#map<u32> (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $3
  i64.const 0
  i64.store
  local.get $3
  local.get $0
  i32.load offset=12
  local.tee $6
  i32.const 50
  i32.const 0
  call $~lib/rt/__newArray
  local.tee $3
  i32.store
  local.get $3
  i32.load offset=4
  local.set $4
  loop $for-loop|0
   local.get $6
   local.get $0
   i32.load offset=12
   local.tee $5
   local.get $5
   local.get $6
   i32.gt_s
   select
   local.get $2
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.const 2
    i32.shl
    local.tee $5
    local.get $0
    i32.load offset=4
    i32.add
    i32.load
    local.tee $7
    i32.store offset=4
    local.get $4
    local.get $5
    i32.add
    local.get $7
    local.get $2
    local.get $0
    local.get $1
    i32.load
    call_indirect $0 (type $i32_i32_i32_=>_i32)
    i32.store
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $3
 )
 (func $logic/index/getSelectedUnitsIds~anonymous|2 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  local.get $0
  i32.load offset=16
  local.tee $0
  i32.store
  local.get $1
  i32.const 5712
  i32.store offset=4
  local.get $0
  i32.const 5712
  call $~lib/array/Array<logic/squad/Squad>#map<u32>
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/index/getSelectedUnitsIds (param $0 f32) (param $1 f32) (param $2 f32) (param $3 f32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 i32)
  (local $15 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 68
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $4
   i64.const 0
   i64.store
   local.get $4
   i64.const 0
   i64.store offset=8
   local.get $4
   i64.const 0
   i64.store offset=16
   local.get $4
   i64.const 0
   i64.store offset=24
   local.get $4
   i64.const 0
   i64.store offset=32
   local.get $4
   i64.const 0
   i64.store offset=40
   local.get $4
   i64.const 0
   i64.store offset=48
   local.get $4
   i64.const 0
   i64.store offset=56
   local.get $4
   i32.const 0
   i32.store offset=64
   local.get $4
   local.get $0
   local.get $1
   call $logic/convert-coords-between-logic-and-visual/convertVisualCoordsToLogic
   local.tee $4
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $2
   local.get $1
   call $logic/convert-coords-between-logic-and-visual/convertVisualCoordsToLogic
   local.tee $5
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   local.get $3
   call $logic/convert-coords-between-logic-and-visual/convertVisualCoordsToLogic
   local.tee $9
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   local.get $3
   call $logic/convert-coords-between-logic-and-visual/convertVisualCoordsToLogic
   local.tee $10
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.const 32
   i32.const 0
   call $~lib/rt/__newArray
   local.tee $12
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   local.get $12
   i32.load offset=4
   i32.store offset=20
   local.get $12
   i32.const 0
   local.get $4
   call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
   local.get $12
   i32.const 1
   local.get $5
   call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
   local.get $12
   i32.const 2
   local.get $9
   call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
   local.get $12
   i32.const 3
   local.get $10
   call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
   local.get $12
   i32.store offset=20
   global.get $~lib/memory/__stack_pointer
   local.get $12
   call $logic/squads-grid-manager/getSquadsFromGridByPolygon
   local.tee $9
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 23
   i32.const 5616
   call $~lib/rt/__newArray
   local.tee $10
   i32.store offset=24
   global.get $~lib/memory/__stack_pointer
   i32.const 5648
   i32.store offset=28
   global.get $~lib/memory/__stack_pointer
   local.get $12
   i32.const 5648
   call $~lib/array/Array<logic/geom-types/Point>#map<logic/geom-types/Line>
   local.tee $11
   i32.store offset=32
   loop $for-loop|0
    local.get $9
    i32.load offset=12
    local.get $6
    i32.gt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.tee $4
     local.get $9
     i32.load offset=4
     local.get $6
     i32.const 2
     i32.shl
     i32.add
     i32.load
     local.tee $12
     i32.store offset=36
     local.get $4
     local.get $12
     call $logic/convert-coords-between-logic-and-visual/getUnitOffset
     local.tee $13
     i32.store offset=40
     local.get $12
     i32.load offset=48
     global.get $logic/index/userFaction
     i32.load offset=16
     i32.eq
     if
      i32.const 0
      local.set $5
      i32.const 0
      local.set $4
      loop $for-loop|1
       global.get $~lib/memory/__stack_pointer
       local.get $12
       i32.load offset=16
       local.tee $14
       i32.store offset=44
       local.get $14
       i32.load offset=12
       local.get $4
       i32.gt_s
       if
        block $for-break1
         global.get $~lib/memory/__stack_pointer
         local.tee $14
         local.get $12
         i32.load offset=16
         local.tee $15
         i32.store offset=44
         local.get $14
         local.get $15
         i32.load offset=4
         local.get $4
         i32.const 2
         i32.shl
         i32.add
         i32.load
         local.tee $15
         i32.store offset=48
         local.get $14
         i32.const 0
         call $logic/geom-types/Point#constructor
         local.tee $14
         i32.store offset=52
         local.get $14
         local.get $15
         f32.load offset=44
         local.get $13
         f32.load
         f32.add
         f32.store
         local.get $14
         local.get $15
         f32.load offset=48
         local.get $13
         f32.load offset=4
         f32.add
         f32.store offset=4
         global.get $~lib/memory/__stack_pointer
         local.get $14
         i32.store offset=44
         local.get $14
         local.get $11
         call $logic/geom-utils/isPointInPolygon
         if
          i32.const 1
          local.set $5
          br $for-break1
         end
         local.get $4
         i32.const 1
         i32.add
         local.set $4
         br $for-loop|1
        end
       end
      end
      local.get $5
      if
       local.get $10
       local.get $12
       call $~lib/array/Array<logic/geom-types/Point>#push
      end
     end
     local.get $6
     i32.const 1
     i32.add
     local.set $6
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   local.tee $4
   i32.const 5680
   i32.store offset=28
   local.get $4
   local.get $10
   i32.const 5680
   call $~lib/array/Array<logic/squad/Squad>#map<u32>
   local.tee $5
   i32.store offset=56
   global.get $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5744
   i32.store offset=60
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $4
   i64.const 0
   i64.store
   local.get $4
   i32.const 0
   i32.store offset=8
   local.get $4
   local.get $10
   i32.load offset=12
   local.tee $4
   i32.const 71
   i32.const 0
   call $~lib/rt/__newArray
   local.tee $9
   i32.store
   local.get $9
   i32.load offset=4
   local.set $11
   loop $for-loop|02
    local.get $4
    local.get $10
    i32.load offset=12
    local.tee $12
    local.get $4
    local.get $12
    i32.lt_s
    select
    local.get $8
    i32.gt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.tee $12
     local.get $8
     i32.const 2
     i32.shl
     local.tee $13
     local.get $10
     i32.load offset=4
     i32.add
     i32.load
     local.tee $14
     i32.store offset=4
     local.get $12
     local.get $14
     local.get $8
     local.get $10
     i32.const 5744
     i32.load
     call_indirect $0 (type $i32_i32_i32_=>_i32)
     local.tee $12
     i32.store offset=8
     local.get $11
     local.get $13
     i32.add
     local.get $12
     i32.store
     local.get $12
     if
      local.get $9
      local.get $12
      i32.const 1
      call $byn-split-outlined-A$~lib/rt/itcms/__link
     end
     local.get $8
     i32.const 1
     i32.add
     local.set $8
     br $for-loop|02
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   local.get $9
   i32.store offset=44
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   local.get $9
   i32.load offset=4
   local.set $8
   local.get $9
   i32.load offset=12
   local.set $9
   i32.const 0
   local.set $4
   loop $for-loop|03
    local.get $7
    local.get $9
    i32.lt_s
    if
     local.get $7
     i32.const 2
     i32.shl
     local.get $8
     i32.add
     i32.load
     local.tee $10
     if (result i32)
      local.get $10
      i32.load offset=12
     else
      i32.const 0
     end
     local.get $4
     i32.add
     local.set $4
     local.get $7
     i32.const 1
     i32.add
     local.set $7
     br $for-loop|03
    end
   end
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.const 2
   i32.shl
   local.tee $7
   i32.const 0
   call $~lib/rt/itcms/__new
   local.tee $10
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.const 50
   call $~lib/rt/itcms/__new
   local.tee $11
   i32.store offset=4
   local.get $11
   local.get $4
   i32.store offset=12
   local.get $11
   local.get $7
   i32.store offset=8
   local.get $11
   local.get $10
   i32.store offset=4
   local.get $11
   local.get $10
   i32.store
   local.get $10
   if
    local.get $11
    local.get $10
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   i32.const 0
   local.set $4
   i32.const 0
   local.set $7
   loop $for-loop|16
    local.get $7
    local.get $9
    i32.lt_s
    if
     local.get $7
     i32.const 2
     i32.shl
     local.get $8
     i32.add
     i32.load
     local.tee $12
     if
      local.get $4
      local.get $10
      i32.add
      local.get $12
      i32.load offset=4
      local.get $12
      i32.load offset=12
      i32.const 2
      i32.shl
      local.tee $12
      call $~lib/memory/memory.copy
      local.get $4
      local.get $12
      i32.add
      local.set $4
     end
     local.get $7
     i32.const 1
     i32.add
     local.set $7
     br $for-loop|16
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $11
   i32.store offset=64
   global.get $~lib/memory/__stack_pointer
   i32.const 1
   i32.const 50
   i32.const 5776
   call $~lib/rt/__newArray
   local.set $6
   global.get $~lib/memory/__stack_pointer
   local.get $6
   i32.store offset=60
   local.get $11
   local.get $6
   call $~lib/array/Array<u32>#concat
   local.set $6
   global.get $~lib/memory/__stack_pointer
   local.get $6
   i32.store offset=44
   local.get $6
   local.get $5
   call $~lib/array/Array<u32>#concat
   local.tee $4
   i32.store offset=36
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $5
   i32.const 0
   i32.store
   local.get $4
   i32.load offset=12
   local.set $6
   local.get $5
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $7
   i32.const 0
   i32.store
   local.get $7
   i32.const 12
   i32.const 43
   call $~lib/rt/itcms/__new
   local.tee $7
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $7
   local.get $6
   call $~lib/arraybuffer/ArrayBufferView#constructor
   local.tee $7
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $5
   local.get $7
   i32.store
   local.get $7
   i32.load offset=4
   local.get $4
   i32.load offset=4
   local.get $6
   i32.const 2
   i32.shl
   call $~lib/memory/memory.copy
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 68
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $7
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/index/debugSelecting (param $0 f32) (param $1 f32) (param $2 f32) (param $3 f32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 40
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $5
   i64.const 0
   i64.store
   local.get $5
   i64.const 0
   i64.store offset=8
   local.get $5
   i64.const 0
   i64.store offset=16
   local.get $5
   i64.const 0
   i64.store offset=24
   local.get $5
   i64.const 0
   i64.store offset=32
   local.get $5
   local.get $0
   local.get $1
   call $logic/convert-coords-between-logic-and-visual/convertVisualCoordsToLogic
   local.tee $6
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $2
   local.get $1
   call $logic/convert-coords-between-logic-and-visual/convertVisualCoordsToLogic
   local.tee $7
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $2
   local.get $3
   call $logic/convert-coords-between-logic-and-visual/convertVisualCoordsToLogic
   local.tee $8
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   local.get $3
   call $logic/convert-coords-between-logic-and-visual/convertVisualCoordsToLogic
   local.tee $9
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.const 32
   i32.const 0
   call $~lib/rt/__newArray
   local.tee $10
   i32.store offset=32
   global.get $~lib/memory/__stack_pointer
   local.get $10
   i32.load offset=4
   i32.store offset=36
   local.get $10
   i32.const 0
   local.get $6
   call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
   local.get $10
   i32.const 1
   local.get $7
   call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
   local.get $10
   i32.const 2
   local.get $8
   call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
   local.get $10
   i32.const 3
   local.get $9
   call $~lib/array/Array<logic/weapon-details/WeaponDetails>#__uset
   global.get $~lib/memory/__stack_pointer
   local.get $10
   i32.store offset=28
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $6
   i64.const 0
   i64.store
   local.get $6
   local.get $10
   call $logic/squads-grid-manager/pickCellIndexesInPolygon
   local.tee $7
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 5808
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $6
   i64.const 0
   i64.store
   local.get $6
   local.get $7
   i32.load offset=12
   local.tee $8
   i32.const 32
   i32.const 0
   call $~lib/rt/__newArray
   local.tee $9
   i32.store
   local.get $9
   i32.load offset=4
   local.set $10
   loop $for-loop|0
    local.get $8
    local.get $7
    i32.load offset=12
    local.tee $6
    local.get $6
    local.get $8
    i32.gt_s
    select
    local.get $4
    i32.gt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.const 2
     i32.shl
     local.tee $6
     local.get $7
     i32.load offset=4
     i32.add
     i32.load
     local.get $4
     local.get $7
     i32.const 5808
     i32.load
     call_indirect $0 (type $i32_i32_i32_=>_i32)
     local.tee $11
     i32.store offset=4
     local.get $6
     local.get $10
     i32.add
     local.get $11
     i32.store
     local.get $11
     if
      local.get $9
      local.get $11
      i32.const 1
      call $byn-split-outlined-A$~lib/rt/itcms/__link
     end
     local.get $4
     i32.const 1
     i32.add
     local.set $4
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   local.get $9
   i32.store offset=20
   global.get $~lib/memory/__stack_pointer
   i32.const 5840
   i32.store offset=24
   local.get $9
   i32.const 5840
   call $~lib/array/Array<logic/geom-types/Line>#map<~lib/array/Array<f32>>
   local.set $4
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store offset=16
   local.get $4
   call $~lib/array/Array<~lib/array/Array<f32>>#flat
   local.tee $4
   i32.store offset=36
   local.get $4
   call $logic/index/toFloat32Array
   global.get $~lib/memory/__stack_pointer
   i32.const 40
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/index/useAbility (param $0 i32) (param $1 i32) (param $2 f32) (param $3 f32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 i32)
  (local $15 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner2
   block $folding-inner1
    block $folding-inner0
     global.get $~lib/memory/__stack_pointer
     i32.const 6788
     i32.lt_s
     br_if $folding-inner0
     global.get $~lib/memory/__stack_pointer
     local.tee $4
     i64.const 0
     i64.store
     local.get $4
     local.get $2
     local.get $3
     call $logic/convert-coords-between-logic-and-visual/convertVisualCoordsToLogic
     local.tee $9
     i32.store
     local.get $9
     f32.load
     local.get $9
     f32.load offset=4
     i32.const 0
     call $logic/obstacles-manager/getIsPointAvailable
     i32.eqz
     if
      i32.const 0
      call $~lib/typedarray/Float32Array#constructor
      local.set $0
      br $folding-inner2
     end
     global.get $~lib/memory/__stack_pointer
     local.tee $4
     global.get $logic/index/userFaction
     local.tee $7
     i32.store offset=4
     local.get $4
     i32.const 20
     i32.sub
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 6788
     i32.lt_s
     br_if $folding-inner0
     global.get $~lib/memory/__stack_pointer
     local.tee $4
     i64.const 0
     i64.store
     local.get $4
     i64.const 0
     i64.store offset=8
     local.get $4
     i32.const 0
     i32.store offset=16
     local.get $4
     i32.const 0
     i32.const 23
     i32.const 5872
     call $~lib/rt/__newArray
     local.tee $15
     i32.store
     loop $for-loop|0
      global.get $~lib/memory/__stack_pointer
      local.get $7
      i32.load offset=4
      local.tee $4
      i32.store offset=4
      local.get $4
      i32.load offset=12
      local.get $11
      i32.gt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.tee $5
       local.get $7
       i32.load offset=4
       local.tee $4
       i32.store offset=4
       local.get $5
       local.get $4
       i32.load offset=4
       local.get $11
       i32.const 2
       i32.shl
       i32.add
       i32.load
       local.tee $10
       i32.store offset=8
       local.get $5
       local.get $10
       i32.load offset=40
       i32.load offset=20
       local.tee $12
       i32.store offset=12
       local.get $12
       i32.const 0
       local.get $10
       i32.load
       local.set $13
       i32.const 0
       local.set $4
       i32.const -1
       local.set $5
       block $~lib/typedarray/INDEX_OF<~lib/typedarray/Uint32Array,u32>|inlined.0
        local.get $0
        i32.load offset=8
        i32.const 2
        i32.shr_u
        local.tee $14
        i32.eqz
        br_if $~lib/typedarray/INDEX_OF<~lib/typedarray/Uint32Array,u32>|inlined.0
        local.get $0
        i32.load offset=4
        local.set $6
        loop $while-continue|0
         local.get $4
         local.get $14
         i32.lt_s
         if
          local.get $13
          local.get $4
          local.tee $5
          i32.const 2
          i32.shl
          local.get $6
          i32.add
          i32.load
          i32.eq
          br_if $~lib/typedarray/INDEX_OF<~lib/typedarray/Uint32Array,u32>|inlined.0
          local.get $5
          i32.const 1
          i32.add
          local.set $4
          br $while-continue|0
         end
        end
        i32.const -1
        local.set $5
       end
       local.get $5
       i32.const 0
       i32.ge_s
       select
       if (result i32)
        local.get $12
        i32.load
        local.get $1
        i32.const 255
        i32.and
        i32.eq
       else
        i32.const 0
       end
       if (result i32)
        local.get $10
        i32.load16_u offset=4
       else
        i32.const 1
       end
       i32.eqz
       if
        local.get $15
        local.get $10
        call $~lib/array/Array<logic/geom-types/Point>#push
       end
       local.get $11
       i32.const 1
       i32.add
       local.set $11
       br $for-loop|0
      end
     end
     local.get $15
     i32.load offset=12
     i32.const 0
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.tee $1
      local.get $15
      i32.const 0
      call $~lib/array/Array<logic/geom-types/Point>#__get
      i32.load offset=40
      i32.load offset=20
      local.tee $4
      i32.store offset=16
      local.get $4
      i32.eqz
      if
       i32.const 3872
       i32.const 5904
       i32.const 72
       i32.const 23
       call $~lib/builtins/abort
       unreachable
      end
      local.get $1
      local.get $4
      i32.store offset=16
      global.get $~lib/memory/__stack_pointer
      i32.const 20
      i32.sub
      global.set $~lib/memory/__stack_pointer
      global.get $~lib/memory/__stack_pointer
      i32.const 6788
      i32.lt_s
      br_if $folding-inner1
      global.get $~lib/memory/__stack_pointer
      local.tee $1
      i64.const 0
      i64.store
      local.get $1
      i64.const 0
      i64.store offset=8
      local.get $1
      i32.const 0
      i32.store offset=16
      local.get $1
      i32.const 0
      i32.const 23
      i32.const 5968
      call $~lib/rt/__newArray
      local.tee $7
      i32.store
      local.get $4
      f32.load offset=8
      f32.const 60
      f32.sub
      local.set $2
      i32.const 0
      local.set $1
      loop $for-loop|00
       local.get $15
       i32.load offset=12
       local.get $1
       i32.gt_s
       if
        global.get $~lib/memory/__stack_pointer
        local.get $15
        local.get $1
        call $~lib/array/Array<logic/geom-types/Point>#__get
        local.tee $5
        i32.store offset=4
        local.get $5
        i32.load offset=36
        local.tee $4
        f32.load
        local.get $9
        f32.load
        f32.sub
        local.get $4
        f32.load offset=4
        local.get $9
        f32.load offset=4
        f32.sub
        call $~lib/math/NativeMathf.hypot
        local.get $2
        f32.gt
        if
         local.get $7
         local.get $5
         call $~lib/array/Array<logic/geom-types/Point>#push
        else
         local.get $5
         i32.const 0
         i32.const 0
         local.get $9
         call $logic/squad/Squad#setTask
        end
        local.get $1
        i32.const 1
        i32.add
        local.set $1
        br $for-loop|00
       end
      end
      local.get $7
      i32.load offset=12
      if
       global.get $~lib/memory/__stack_pointer
       local.get $7
       local.get $9
       local.get $2
       call $logic/hex-positions/getPositions
       local.tee $6
       i32.store offset=8
       global.get $~lib/memory/__stack_pointer
       i32.const 6000
       i32.store offset=12
       local.get $7
       i32.load offset=4
       local.get $7
       i32.load offset=12
       i32.const 6000
       call $~lib/util/sort/SORT<logic/geom-types/Point>
       loop $for-loop|1
        local.get $7
        i32.load offset=12
        local.get $8
        i32.gt_s
        if
         global.get $~lib/memory/__stack_pointer
         local.tee $5
         local.get $8
         i32.const 2
         i32.shl
         local.tee $1
         local.get $7
         i32.load offset=4
         i32.add
         i32.load
         local.tee $4
         i32.store offset=16
         local.get $5
         local.get $1
         local.get $6
         i32.load offset=4
         i32.add
         i32.load
         local.tee $1
         i32.store offset=12
         local.get $4
         local.get $1
         i32.const 0
         local.get $9
         call $logic/squad/Squad#setTask
         local.get $8
         i32.const 1
         i32.add
         local.set $8
         br $for-loop|1
        end
       end
      end
      global.get $~lib/memory/__stack_pointer
      i32.const 20
      i32.add
      global.set $~lib/memory/__stack_pointer
     end
     global.get $~lib/memory/__stack_pointer
     i32.const 20
     i32.add
     global.set $~lib/memory/__stack_pointer
     local.get $0
     call $logic/index/getSquadsDestinations
     local.set $0
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $0
     call $logic/index/toFloat32Array
     local.set $0
     br $folding-inner2
    end
   end
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $logic/index/getAbilitiesCoolDowns (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 32
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i64.const 0
  i64.store
  local.get $2
  i64.const 0
  i64.store offset=8
  local.get $2
  i64.const 0
  i64.store offset=16
  local.get $2
  i64.const 0
  i64.store offset=24
  local.get $2
  i32.const 0
  i32.const 46
  i32.const 6032
  call $~lib/rt/__newArray
  local.tee $6
  i32.store
  loop $for-loop|0
   global.get $~lib/memory/__stack_pointer
   global.get $logic/index/userFaction
   i32.load offset=4
   local.tee $2
   i32.store offset=4
   local.get $2
   i32.load offset=12
   local.get $7
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.tee $3
    global.get $logic/index/userFaction
    i32.load offset=4
    local.tee $2
    i32.store offset=4
    local.get $3
    local.get $2
    i32.load offset=4
    local.get $7
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $5
    i32.store offset=8
    local.get $3
    local.get $5
    i32.load offset=40
    i32.load offset=20
    local.tee $8
    i32.store offset=12
    local.get $8
    i32.const 0
    local.get $5
    i32.load
    local.set $9
    i32.const 0
    local.set $3
    i32.const -1
    local.set $2
    block $~lib/typedarray/INDEX_OF<~lib/typedarray/Uint32Array,u32>|inlined.0
     local.get $0
     i32.load offset=8
     i32.const 2
     i32.shr_u
     local.tee $10
     i32.eqz
     br_if $~lib/typedarray/INDEX_OF<~lib/typedarray/Uint32Array,u32>|inlined.0
     local.get $0
     i32.load offset=4
     local.set $4
     loop $while-continue|0
      local.get $3
      local.get $10
      i32.lt_s
      if
       local.get $9
       local.get $3
       local.tee $2
       i32.const 2
       i32.shl
       local.get $4
       i32.add
       i32.load
       i32.eq
       br_if $~lib/typedarray/INDEX_OF<~lib/typedarray/Uint32Array,u32>|inlined.0
       local.get $2
       i32.const 1
       i32.add
       local.set $3
       br $while-continue|0
      end
     end
     i32.const -1
     local.set $2
    end
    local.get $2
    i32.const 0
    i32.ge_s
    select
    if (result i32)
     local.get $1
     f32.convert_i32_u
     f32.const 1.1920928955078125e-07
     f32.lt
     if (result i32)
      i32.const 1
     else
      local.get $5
      i32.load offset=40
      f32.load
      local.get $1
      f32.convert_i32_u
      f32.sub
      f64.promote_f32
      f64.abs
      f64.const 1.1920928955078125e-07
      f64.lt
     end
    else
     i32.const 0
    end
    if
     local.get $5
     call $logic/squad/Squad#updateCenter
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.load offset=36
     local.tee $2
     f32.load
     local.get $2
     f32.load offset=4
     call $logic/convert-coords-between-logic-and-visual/convertLogicCoordsToVisual
     local.tee $4
     i32.store offset=16
     global.get $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 5
     i32.const 46
     i32.const 0
     call $~lib/rt/__newArray
     local.tee $2
     i32.store offset=24
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.load offset=4
     i32.store offset=28
     local.get $2
     i32.load offset=4
     local.get $8
     i32.load
     f32.convert_i32_s
     f32.store
     local.get $2
     i32.load offset=4
     f32.const 0
     f32.const 1
     local.get $5
     i32.load16_u offset=4
     select
     f32.store offset=4
     local.get $2
     i32.load offset=4
     local.get $5
     i32.load16_u offset=4
     f32.convert_i32_u
     local.get $8
     i32.load16_u offset=4
     f32.convert_i32_u
     f32.div
     f32.store offset=8
     local.get $2
     i32.load offset=4
     local.get $4
     f32.load
     f32.store offset=12
     local.get $2
     i32.load offset=4
     local.get $4
     f32.load offset=4
     f32.store offset=16
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=20
     local.get $6
     local.get $2
     call $~lib/array/Array<f32>#concat
     local.tee $6
     i32.store
    end
    local.get $7
    i32.const 1
    i32.add
    local.set $7
    br $for-loop|0
   end
  end
  local.get $6
  call $logic/index/toFloat32Array
  global.get $~lib/memory/__stack_pointer
  i32.const 32
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/geom-types/Point#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.const 4
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store
  end
  local.get $0
  f32.const 0
  f32.store
  local.get $0
  f32.const 0
  f32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/arraybuffer/ArrayBuffer#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1056
   i32.const 1568
   i32.const 52
   i32.const 43
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.const 0
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $logic/weapon-details/WeaponDetails#constructor (result i32)
  (local $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 36
  i32.const 10
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  local.get $0
  f32.const 0
  f32.store
  local.get $0
  f32.const 0
  f32.store offset=4
  local.get $0
  f32.const 0
  f32.store offset=8
  local.get $0
  f32.const 0
  f32.store offset=12
  local.get $0
  i32.const 0
  i32.store16 offset=16
  local.get $0
  i32.const 0
  i32.store16 offset=18
  local.get $0
  f32.const 0
  f32.store offset=20
  local.get $0
  i32.const 0
  i32.store16 offset=24
  local.get $0
  i32.const 0
  i32.store8 offset=26
  local.get $0
  f32.const 0
  f32.store offset=28
  local.get $0
  f32.const 0
  f32.store offset=32
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/map/Map<i32,logic/weapon-details/WeaponDetails>#set (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   local.get $0
   i32.load
   local.get $1
   local.tee $3
   i32.const -1028477379
   i32.mul
   i32.const 374761397
   i32.add
   i32.const 17
   i32.rotl
   i32.const 668265263
   i32.mul
   local.tee $1
   i32.const 15
   i32.shr_u
   local.get $1
   i32.xor
   i32.const -2048144777
   i32.mul
   local.tee $1
   i32.const 13
   i32.shr_u
   local.get $1
   i32.xor
   i32.const -1028477379
   i32.mul
   local.tee $1
   i32.const 16
   i32.shr_u
   local.get $1
   i32.xor
   local.tee $7
   local.get $0
   i32.load offset=4
   i32.and
   i32.const 2
   i32.shl
   i32.add
   i32.load
   local.set $1
   block $__inlined_func$~lib/map/Map<i32,logic/weapon-details/WeaponDetails>#find
    loop $while-continue|0
     local.get $1
     if
      local.get $1
      i32.load offset=8
      local.tee $4
      i32.const 1
      i32.and
      if (result i32)
       i32.const 0
      else
       local.get $3
       local.get $1
       i32.load
       i32.eq
      end
      br_if $__inlined_func$~lib/map/Map<i32,logic/weapon-details/WeaponDetails>#find
      local.get $4
      i32.const -2
      i32.and
      local.set $1
      br $while-continue|0
     end
    end
    i32.const 0
    local.set $1
   end
   local.get $1
   if
    local.get $1
    local.get $2
    i32.store offset=4
    local.get $2
    if
     local.get $0
     local.get $2
     i32.const 1
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
   else
    local.get $0
    i32.load offset=16
    local.get $0
    i32.load offset=12
    i32.eq
    if
     local.get $0
     i32.load offset=20
     local.get $0
     i32.load offset=12
     i32.const 3
     i32.mul
     i32.const 4
     i32.div_s
     i32.lt_s
     if (result i32)
      local.get $0
      i32.load offset=4
     else
      local.get $0
      i32.load offset=4
      i32.const 1
      i32.shl
      i32.const 1
      i32.or
     end
     local.set $6
     global.get $~lib/memory/__stack_pointer
     i32.const 8
     i32.sub
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 6788
     i32.lt_s
     br_if $folding-inner0
     global.get $~lib/memory/__stack_pointer
     local.tee $1
     i64.const 0
     i64.store
     local.get $1
     local.get $6
     i32.const 1
     i32.add
     local.tee $1
     i32.const 2
     i32.shl
     call $~lib/arraybuffer/ArrayBuffer#constructor
     local.tee $10
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.const 3
     i32.shl
     i32.const 3
     i32.div_s
     local.tee $8
     i32.const 12
     i32.mul
     call $~lib/arraybuffer/ArrayBuffer#constructor
     local.tee $4
     i32.store offset=4
     local.get $0
     i32.load offset=8
     local.tee $5
     local.get $0
     i32.load offset=16
     i32.const 12
     i32.mul
     i32.add
     local.set $9
     local.get $4
     local.set $1
     loop $while-continue|00
      local.get $5
      local.get $9
      i32.ne
      if
       local.get $5
       i32.load offset=8
       i32.const 1
       i32.and
       i32.eqz
       if
        local.get $1
        local.get $5
        i32.load
        local.tee $11
        i32.store
        local.get $1
        local.get $5
        i32.load offset=4
        i32.store offset=4
        local.get $1
        local.get $11
        i32.const -1028477379
        i32.mul
        i32.const 374761397
        i32.add
        i32.const 17
        i32.rotl
        i32.const 668265263
        i32.mul
        local.tee $11
        i32.const 15
        i32.shr_u
        local.get $11
        i32.xor
        i32.const -2048144777
        i32.mul
        local.tee $11
        i32.const 13
        i32.shr_u
        local.get $11
        i32.xor
        i32.const -1028477379
        i32.mul
        local.tee $11
        i32.const 16
        i32.shr_u
        local.get $11
        i32.xor
        local.get $6
        i32.and
        i32.const 2
        i32.shl
        local.get $10
        i32.add
        local.tee $11
        i32.load
        i32.store offset=8
        local.get $11
        local.get $1
        i32.store
        local.get $1
        i32.const 12
        i32.add
        local.set $1
       end
       local.get $5
       i32.const 12
       i32.add
       local.set $5
       br $while-continue|00
      end
     end
     local.get $0
     local.get $10
     i32.store
     local.get $10
     if
      local.get $0
      local.get $10
      i32.const 0
      call $byn-split-outlined-A$~lib/rt/itcms/__link
     end
     local.get $0
     local.get $6
     i32.store offset=4
     local.get $0
     local.get $4
     i32.store offset=8
     local.get $4
     if
      local.get $0
      local.get $4
      i32.const 0
      call $byn-split-outlined-A$~lib/rt/itcms/__link
     end
     local.get $0
     local.get $8
     i32.store offset=12
     local.get $0
     local.get $0
     i32.load offset=20
     i32.store offset=16
     global.get $~lib/memory/__stack_pointer
     i32.const 8
     i32.add
     global.set $~lib/memory/__stack_pointer
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=8
    local.tee $1
    i32.store
    local.get $0
    local.get $0
    i32.load offset=16
    local.tee $4
    i32.const 1
    i32.add
    i32.store offset=16
    local.get $4
    i32.const 12
    i32.mul
    local.get $1
    i32.add
    local.tee $1
    local.get $3
    i32.store
    local.get $1
    local.get $2
    i32.store offset=4
    local.get $2
    if
     local.get $0
     local.get $2
     i32.const 1
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    local.get $0
    local.get $0
    i32.load offset=20
    i32.const 1
    i32.add
    i32.store offset=20
    local.get $1
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    local.get $7
    i32.and
    i32.const 2
    i32.shl
    i32.add
    local.tee $0
    i32.load
    i32.store offset=8
    local.get $0
    local.get $1
    i32.store
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/ability-details/Usage#constructor (result i32)
  (local $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 2
  i32.const 22
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  local.get $0
  i32.const 0
  i32.store8
  local.get $0
  i32.const 0
  i32.store8 offset=1
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $logic/ability-details/Ability#constructor (result i32)
  (local $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 22
  i32.const 21
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store16 offset=4
  local.get $0
  i32.const 0
  i32.store8 offset=6
  local.get $0
  f32.const 0
  f32.store offset=8
  local.get $0
  i32.const 0
  i32.store8 offset=12
  local.get $0
  i32.const 0
  i32.store offset=16
  local.get $0
  i32.const 0
  i32.store16 offset=20
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $logic/squad-details/SquadDetails#constructor (result i32)
  (local $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 24
  i32.const 20
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  local.get $0
  f32.const 0
  f32.store
  local.get $0
  i32.const 0
  i32.store16 offset=4
  local.get $0
  i32.const 0
  i32.store8 offset=6
  local.get $0
  i32.const 0
  i32.store16 offset=8
  local.get $0
  f32.const 0
  f32.store offset=12
  local.get $0
  f32.const 0
  f32.store offset=16
  local.get $0
  i32.const 0
  i32.store offset=20
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#constructor (result i32)
  (local $0 i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 24
  i32.const 31
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  local.get $0
  i32.const 16
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.tee $1
  i32.store
  local.get $1
  if
   local.get $0
   local.get $1
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  local.get $0
  i32.const 3
  i32.store offset=4
  local.get $0
  i32.const 48
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.tee $1
  i32.store offset=8
  local.get $1
  if
   local.get $0
   local.get $1
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  local.get $0
  i32.const 4
  i32.store offset=12
  local.get $0
  i32.const 0
  i32.store offset=16
  local.get $0
  i32.const 0
  i32.store offset=20
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/rt/__newArray (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $5
  i32.const 0
  i32.store
  local.get $0
  i32.const 2
  i32.shl
  local.tee $4
  i32.const 0
  call $~lib/rt/itcms/__new
  local.set $3
  local.get $2
  if
   local.get $3
   local.get $2
   local.get $4
   call $~lib/memory/memory.copy
  end
  local.get $5
  local.get $3
  i32.store
  i32.const 16
  local.get $1
  call $~lib/rt/itcms/__new
  local.tee $1
  local.get $3
  i32.store
  local.get $3
  if
   local.get $1
   local.get $3
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  local.get $1
  local.get $3
  i32.store offset=4
  local.get $1
  local.get $4
  i32.store offset=8
  local.get $1
  local.get $0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $~lib/array/Array<logic/geom-types/Point>#__get (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.load offset=12
  local.get $1
  i32.le_u
  if
   i32.const 1360
   i32.const 1632
   i32.const 114
   i32.const 42
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $0
  i32.store
  local.get $0
  i32.eqz
  if
   i32.const 2256
   i32.const 1632
   i32.const 118
   i32.const 40
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $start:logic/get-mean-angle~anonymous|0~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $3
  i32.const 0
  i32.store
  local.get $3
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  f32.load
  local.get $1
  f32.load offset=52
  call $~lib/math/NativeMathf.sin
  f32.add
  f32.store
  local.get $2
  local.get $0
  f32.load offset=4
  local.get $1
  f32.load offset=52
  call $~lib/math/NativeMathf.cos
  f32.add
  f32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $logic/squad/TaskTodo#constructor (result i32)
  (local $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 12
  i32.const 15
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $logic/squad/Squad#updateCenter~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $3
  i32.const 0
  i32.store
  local.get $3
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  f32.load
  local.get $1
  f32.load offset=44
  f32.add
  f32.store
  local.get $2
  local.get $0
  f32.load offset=4
  local.get $1
  f32.load offset=48
  f32.add
  f32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $~lib/array/Array<~lib/array/Array<logic/geom-types/Line>|null>#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  i32.const 16
  i32.const 9
  call $~lib/rt/itcms/__new
  local.tee $1
  i32.store
  local.get $1
  i32.const 0
  i32.store
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $1
  i32.const 0
  i32.store offset=12
  local.get $0
  i32.const 268435455
  i32.gt_u
  if
   i32.const 1056
   i32.const 1632
   i32.const 70
   i32.const 60
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.const 8
  local.get $0
  i32.const 8
  i32.gt_u
  select
  i32.const 2
  i32.shl
  local.tee $2
  i32.const 0
  call $~lib/rt/itcms/__new
  local.tee $3
  i32.store offset=4
  local.get $1
  local.get $3
  i32.store
  local.get $3
  if
   local.get $1
   local.get $3
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  local.get $1
  local.get $3
  i32.store offset=4
  local.get $1
  local.get $2
  i32.store offset=8
  local.get $1
  local.get $0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $logic/geom-types/Line#constructor (result i32)
  (local $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.const 7
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $logic/obstacles-manager/getAllLinesWithinPolygon~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $3
  i32.const 0
  i32.store
  local.get $3
  call $logic/geom-types/Line#constructor
  local.tee $3
  i32.store
  local.get $3
  local.get $0
  i32.store
  local.get $0
  if
   local.get $3
   local.get $0
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  local.get $3
  local.get $2
  local.get $1
  i32.const 1
  i32.add
  local.get $2
  i32.load offset=12
  i32.rem_s
  call $~lib/array/Array<logic/geom-types/Point>#__get
  local.tee $0
  i32.store offset=4
  local.get $0
  if
   local.get $3
   local.get $0
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $3
 )
 (func $logic/geom-types/UniquePoint#constructor (result i32)
  (local $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 12
  i32.const 18
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  call $logic/geom-types/Point#constructor
  local.tee $0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $logic/geom-types/UniqueLine#constructor (result i32)
  (local $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.const 45
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#set (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   local.get $0
   i32.load
   local.get $1
   local.tee $3
   i32.const -1028477379
   i32.mul
   i32.const 374761397
   i32.add
   i32.const 17
   i32.rotl
   i32.const 668265263
   i32.mul
   local.tee $1
   local.get $1
   i32.const 15
   i32.shr_u
   i32.xor
   i32.const -2048144777
   i32.mul
   local.tee $1
   local.get $1
   i32.const 13
   i32.shr_u
   i32.xor
   i32.const -1028477379
   i32.mul
   local.tee $1
   local.get $1
   i32.const 16
   i32.shr_u
   i32.xor
   local.tee $7
   local.get $0
   i32.load offset=4
   i32.and
   i32.const 2
   i32.shl
   i32.add
   i32.load
   local.set $1
   block $__inlined_func$~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#find
    loop $while-continue|0
     local.get $1
     if
      local.get $1
      i32.load offset=8
      local.tee $4
      i32.const 1
      i32.and
      if (result i32)
       i32.const 0
      else
       local.get $3
       local.get $1
       i32.load
       i32.eq
      end
      br_if $__inlined_func$~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#find
      local.get $4
      i32.const -2
      i32.and
      local.set $1
      br $while-continue|0
     end
    end
    i32.const 0
    local.set $1
   end
   local.get $1
   if
    local.get $1
    local.get $2
    i32.store offset=4
    local.get $2
    if
     local.get $0
     local.get $2
     i32.const 1
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
   else
    local.get $0
    i32.load offset=16
    local.get $0
    i32.load offset=12
    i32.eq
    if
     local.get $0
     i32.load offset=20
     local.get $0
     i32.load offset=12
     i32.const 3
     i32.mul
     i32.const 4
     i32.div_s
     i32.lt_s
     if (result i32)
      local.get $0
      i32.load offset=4
     else
      local.get $0
      i32.load offset=4
      i32.const 1
      i32.shl
      i32.const 1
      i32.or
     end
     local.set $6
     global.get $~lib/memory/__stack_pointer
     i32.const 8
     i32.sub
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 6788
     i32.lt_s
     br_if $folding-inner0
     global.get $~lib/memory/__stack_pointer
     local.tee $1
     i64.const 0
     i64.store
     local.get $1
     local.get $6
     i32.const 1
     i32.add
     local.tee $1
     i32.const 2
     i32.shl
     call $~lib/arraybuffer/ArrayBuffer#constructor
     local.tee $10
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.const 3
     i32.shl
     i32.const 3
     i32.div_s
     local.tee $8
     i32.const 12
     i32.mul
     call $~lib/arraybuffer/ArrayBuffer#constructor
     local.tee $4
     i32.store offset=4
     local.get $0
     i32.load offset=8
     local.tee $5
     local.get $0
     i32.load offset=16
     i32.const 12
     i32.mul
     i32.add
     local.set $9
     local.get $4
     local.set $1
     loop $while-continue|00
      local.get $5
      local.get $9
      i32.ne
      if
       local.get $5
       i32.load offset=8
       i32.const 1
       i32.and
       i32.eqz
       if
        local.get $1
        local.get $5
        i32.load
        local.tee $11
        i32.store
        local.get $1
        local.get $5
        i32.load offset=4
        i32.store offset=4
        local.get $1
        local.get $11
        i32.const -1028477379
        i32.mul
        i32.const 374761397
        i32.add
        i32.const 17
        i32.rotl
        i32.const 668265263
        i32.mul
        local.tee $11
        i32.const 15
        i32.shr_u
        local.get $11
        i32.xor
        i32.const -2048144777
        i32.mul
        local.tee $11
        i32.const 13
        i32.shr_u
        local.get $11
        i32.xor
        i32.const -1028477379
        i32.mul
        local.tee $11
        i32.const 16
        i32.shr_u
        local.get $11
        i32.xor
        local.get $6
        i32.and
        i32.const 2
        i32.shl
        local.get $10
        i32.add
        local.tee $11
        i32.load
        i32.store offset=8
        local.get $11
        local.get $1
        i32.store
        local.get $1
        i32.const 12
        i32.add
        local.set $1
       end
       local.get $5
       i32.const 12
       i32.add
       local.set $5
       br $while-continue|00
      end
     end
     local.get $0
     local.get $10
     i32.store
     local.get $10
     if
      local.get $0
      local.get $10
      i32.const 0
      call $byn-split-outlined-A$~lib/rt/itcms/__link
     end
     local.get $0
     local.get $6
     i32.store offset=4
     local.get $0
     local.get $4
     i32.store offset=8
     local.get $4
     if
      local.get $0
      local.get $4
      i32.const 0
      call $byn-split-outlined-A$~lib/rt/itcms/__link
     end
     local.get $0
     local.get $8
     i32.store offset=12
     local.get $0
     local.get $0
     i32.load offset=20
     i32.store offset=16
     global.get $~lib/memory/__stack_pointer
     i32.const 8
     i32.add
     global.set $~lib/memory/__stack_pointer
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=8
    local.tee $1
    i32.store
    local.get $0
    local.get $0
    i32.load offset=16
    local.tee $4
    i32.const 1
    i32.add
    i32.store offset=16
    local.get $4
    i32.const 12
    i32.mul
    local.get $1
    i32.add
    local.tee $1
    local.get $3
    i32.store
    local.get $1
    local.get $2
    i32.store offset=4
    local.get $2
    if
     local.get $0
     local.get $2
     i32.const 1
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    local.get $0
    local.get $0
    i32.load offset=20
    i32.const 1
    i32.add
    i32.store offset=20
    local.get $1
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    local.get $7
    i32.and
    i32.const 2
    i32.shl
    i32.add
    local.tee $0
    i32.load
    i32.store offset=8
    local.get $0
    local.get $1
    i32.store
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/index/debugObstacles~anonymous|0~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i64.const 0
  i64.store
  local.get $2
  i32.const 4
  i32.const 46
  i32.const 0
  call $~lib/rt/__newArray
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.load offset=4
  i32.store offset=4
  local.get $1
  i32.load offset=4
  local.get $0
  i32.load
  f32.load
  f32.store
  local.get $1
  i32.load offset=4
  local.get $0
  i32.load
  f32.load offset=4
  f32.store offset=4
  local.get $1
  i32.load offset=4
  local.get $0
  i32.load offset=4
  f32.load
  f32.store offset=8
  local.get $1
  i32.load offset=4
  local.get $0
  i32.load offset=4
  f32.load offset=4
  f32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $~lib/array/Array<~lib/array/Array<f32>>#flat (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  local.get $0
  i32.load offset=4
  local.set $4
  local.get $0
  i32.load offset=12
  local.set $3
  i32.const 0
  local.set $0
  loop $for-loop|0
   local.get $0
   local.get $3
   i32.lt_s
   if
    local.get $0
    i32.const 2
    i32.shl
    local.get $4
    i32.add
    i32.load
    local.tee $2
    if (result i32)
     local.get $2
     i32.load offset=12
    else
     i32.const 0
    end
    local.get $1
    i32.add
    local.set $1
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.const 2
  i32.shl
  local.tee $0
  i32.const 0
  call $~lib/rt/itcms/__new
  local.tee $5
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.const 46
  call $~lib/rt/itcms/__new
  local.tee $2
  i32.store offset=4
  local.get $2
  local.get $1
  i32.store offset=12
  local.get $2
  local.get $0
  i32.store offset=8
  local.get $2
  local.get $5
  i32.store offset=4
  local.get $2
  local.get $5
  i32.store
  local.get $5
  if
   local.get $2
   local.get $5
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  i32.const 0
  local.set $1
  i32.const 0
  local.set $0
  loop $for-loop|1
   local.get $0
   local.get $3
   i32.lt_s
   if
    local.get $0
    i32.const 2
    i32.shl
    local.get $4
    i32.add
    i32.load
    local.tee $6
    if
     local.get $1
     local.get $5
     i32.add
     local.get $6
     i32.load offset=4
     local.get $6
     i32.load offset=12
     i32.const 2
     i32.shl
     local.tee $6
     call $~lib/memory/memory.copy
     local.get $1
     local.get $6
     i32.add
     local.set $1
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|1
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $~lib/array/Array<f32>#concat (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.load offset=12
  local.tee $3
  local.get $1
  i32.load offset=12
  i32.const 0
  local.get $1
  select
  local.tee $2
  i32.add
  local.tee $4
  i32.const 268435455
  i32.gt_u
  if
   i32.const 1056
   i32.const 1632
   i32.const 244
   i32.const 60
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $4
  i32.const 46
  i32.const 0
  call $~lib/rt/__newArray
  local.tee $4
  i32.store
  local.get $4
  i32.load offset=4
  local.tee $5
  local.get $0
  i32.load offset=4
  local.get $3
  i32.const 2
  i32.shl
  local.tee $0
  call $~lib/memory/memory.copy
  local.get $0
  local.get $5
  i32.add
  local.get $1
  i32.load offset=4
  local.get $2
  i32.const 2
  i32.shl
  call $~lib/memory/memory.copy
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $4
 )
 (func $~lib/arraybuffer/ArrayBufferView#constructor (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  local.get $0
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.const 2
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store
  end
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  i32.const 0
  i32.store offset=8
  local.get $1
  i32.const 268435455
  i32.gt_u
  if
   i32.const 1056
   i32.const 1568
   i32.const 19
   i32.const 57
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.const 2
  i32.shl
  local.tee $1
  i32.const 0
  call $~lib/rt/itcms/__new
  local.tee $2
  i32.store offset=4
  local.get $0
  local.get $2
  i32.store
  local.get $2
  if
   local.get $0
   local.get $2
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  local.get $0
  local.get $2
  i32.store offset=4
  local.get $0
  local.get $1
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/typedarray/Float32Array#constructor (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i32.const 0
  i32.store
  local.get $1
  i32.const 12
  i32.const 42
  call $~lib/rt/itcms/__new
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  local.get $0
  call $~lib/arraybuffer/ArrayBufferView#constructor
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $logic/index/toFloat32Array (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i32.const 0
  i32.store
  local.get $1
  local.get $0
  i32.load offset=12
  local.tee $2
  call $~lib/typedarray/Float32Array#constructor
  local.tee $1
  i32.store
  local.get $1
  i32.load offset=4
  local.get $0
  i32.load offset=4
  local.get $2
  i32.const 2
  i32.shl
  call $~lib/memory/memory.copy
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $logic/index/debugOuterTrack~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i64.const 0
  i64.store
  local.get $2
  i32.const 5
  i32.const 46
  i32.const 0
  call $~lib/rt/__newArray
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.load offset=4
  i32.store offset=4
  local.get $1
  i32.load offset=4
  local.get $0
  i32.load
  f32.load
  f32.store
  local.get $1
  i32.load offset=4
  local.get $0
  i32.load
  f32.load offset=4
  f32.store offset=4
  local.get $1
  i32.load offset=4
  local.get $0
  i32.load offset=4
  f32.load
  f32.store offset=8
  local.get $1
  i32.load offset=4
  local.get $0
  i32.load offset=4
  f32.load offset=4
  f32.store offset=12
  local.get $1
  i32.load offset=4
  f32.const -1
  f32.store offset=16
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $~lib/map/Map<u32,~lib/array/Array<logic/geom-types/UniquePoint>>#keys (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $3
   i32.const 0
   i32.store
   local.get $0
   i32.load offset=8
   local.set $5
   local.get $0
   i32.load offset=16
   local.set $7
   local.get $3
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $0
   i64.const 0
   i64.store
   local.get $0
   i32.const 16
   i32.const 50
   call $~lib/rt/itcms/__new
   local.tee $2
   i32.store
   local.get $2
   i32.const 0
   i32.store
   local.get $2
   i32.const 0
   i32.store offset=4
   local.get $2
   i32.const 0
   i32.store offset=8
   local.get $2
   i32.const 0
   i32.store offset=12
   local.get $7
   i32.const 268435455
   i32.gt_u
   if
    i32.const 1056
    i32.const 1632
    i32.const 70
    i32.const 60
    call $~lib/builtins/abort
    unreachable
   end
   global.get $~lib/memory/__stack_pointer
   local.get $7
   i32.const 8
   local.get $7
   i32.const 8
   i32.gt_u
   select
   i32.const 2
   i32.shl
   local.tee $1
   i32.const 0
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store offset=4
   local.get $2
   local.get $0
   i32.store
   local.get $0
   if
    local.get $2
    local.get $0
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   local.get $2
   local.get $0
   i32.store offset=4
   local.get $2
   local.get $1
   i32.store offset=8
   local.get $2
   local.get $7
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $3
   local.get $2
   i32.store
   i32.const 0
   local.set $0
   loop $for-loop|0
    local.get $6
    local.get $7
    i32.lt_s
    if
     local.get $6
     i32.const 12
     i32.mul
     local.get $5
     i32.add
     local.tee $1
     i32.load offset=8
     i32.const 1
     i32.and
     i32.eqz
     if
      local.get $1
      i32.load
      local.set $3
      local.get $0
      local.tee $1
      i32.const 1
      i32.add
      local.set $0
      local.get $2
      i32.load offset=12
      local.get $1
      i32.le_u
      if
       local.get $1
       i32.const 0
       i32.lt_s
       if
        i32.const 1360
        i32.const 1632
        i32.const 130
        i32.const 22
        call $~lib/builtins/abort
        unreachable
       end
       local.get $2
       local.get $1
       i32.const 1
       i32.add
       local.tee $4
       i32.const 1
       call $~lib/array/ensureCapacity
       local.get $2
       local.get $4
       i32.store offset=12
      end
      local.get $2
      i32.load offset=4
      local.get $1
      i32.const 2
      i32.shl
      i32.add
      local.get $3
      i32.store
     end
     local.get $6
     i32.const 1
     i32.add
     local.set $6
     br $for-loop|0
    end
   end
   local.get $2
   local.get $0
   i32.const 0
   call $~lib/array/ensureCapacity
   local.get $2
   local.get $0
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $2
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $logic/convert-coords-between-logic-and-visual/convertLogicCoordsToVisual (param $0 f32) (param $1 f32) (result i32)
  (local $2 i32)
  (local $3 f32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  global.get $logic/index/mapHeightGlob
  local.get $1
  f32.sub
  call $~lib/math/NativeMathf.atan2
  f32.const -0.6499999761581421
  f32.add
  local.set $3
  local.get $0
  global.get $logic/index/mapHeightGlob
  local.get $1
  f32.sub
  call $~lib/math/NativeMathf.hypot
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store
  local.get $2
  local.get $3
  call $~lib/math/NativeMathf.sin
  local.get $0
  f32.mul
  f32.store
  local.get $2
  local.get $3
  call $~lib/math/NativeMathf.cos
  f32.neg
  local.get $0
  f32.mul
  global.get $logic/index/mapHeightGlob
  f32.add
  f32.const 0.5199999809265137
  f32.mul
  f32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $logic/squads-grid-manager/debugGridNumbers~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 f32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $2
   i64.const 0
   i64.store
   local.get $2
   i32.const 0
   i32.store offset=8
   local.get $2
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $4
   i32.const 0
   i32.store
   local.get $4
   i32.const 0
   call $logic/geom-types/Point#constructor
   local.tee $4
   i32.store
   local.get $4
   local.get $1
   f32.convert_i32_s
   local.tee $3
   global.get $logic/squads-grid-manager/gridMapWidth
   f32.convert_i32_s
   call $~lib/math/NativeMathf.mod
   f32.floor
   global.get $logic/squads-grid-manager/gridMapScaleX
   f32.div
   f32.store
   local.get $4
   local.get $3
   global.get $logic/squads-grid-manager/gridMapWidth
   f32.convert_i32_s
   f32.div
   f32.floor
   global.get $logic/squads-grid-manager/gridMapScaleY
   f32.div
   f32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $2
   local.get $4
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 3
   i32.const 46
   i32.const 0
   call $~lib/rt/__newArray
   local.tee $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.load offset=4
   i32.store offset=8
   local.get $1
   i32.load offset=4
   local.get $0
   if (result f32)
    local.get $0
    i32.load offset=12
    f32.convert_i32_s
   else
    f32.const 0
   end
   f32.store
   local.get $1
   i32.load offset=4
   local.get $4
   f32.load
   f32.const 1
   global.get $logic/squads-grid-manager/gridMapScaleX
   f32.div
   f32.const 0.5
   f32.mul
   f32.add
   f32.store offset=4
   local.get $1
   i32.load offset=4
   local.get $4
   f32.load offset=4
   f32.const 1
   global.get $logic/squads-grid-manager/gridMapScaleY
   f32.div
   f32.const 0.5
   f32.mul
   f32.add
   f32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $1
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $~lib/array/Array<logic/unit/Unit>#filter (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $3
  i64.const 0
  i64.store
  local.get $3
  i32.const 0
  i32.const 17
  i32.const 0
  call $~lib/rt/__newArray
  local.tee $4
  i32.store
  local.get $0
  i32.load offset=12
  local.set $3
  loop $for-loop|0
   local.get $3
   local.get $0
   i32.load offset=12
   local.tee $5
   local.get $3
   local.get $5
   i32.lt_s
   select
   local.get $2
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=4
    local.get $2
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $5
    i32.store offset=4
    local.get $5
    local.get $2
    local.get $0
    local.get $1
    i32.load
    call_indirect $0 (type $i32_i32_i32_=>_i32)
    if
     local.get $4
     local.get $5
     call $~lib/array/Array<logic/geom-types/Point>#push
    end
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $4
 )
 (func $logic/squad/Squad#keepCoherency~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i32.const 0
  i32.store
  local.get $2
  local.get $0
  i32.load offset=56
  i32.load offset=36
  local.tee $1
  i32.store
  local.get $1
  f32.load
  local.get $0
  f32.load offset=44
  f32.sub
  f64.promote_f32
  local.get $1
  f32.load offset=4
  local.get $0
  f32.load offset=48
  f32.sub
  f64.promote_f32
  call $~lib/math/NativeMath.hypot
  f64.const 160
  f64.gt
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $logic/obstacles-manager/getIsPointAvailable (param $0 f32) (param $1 f32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner1
   block $folding-inner0
    global.get $~lib/memory/__stack_pointer
    i32.const 6788
    i32.lt_s
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    local.tee $5
    i64.const 0
    i64.store
    local.get $5
    i64.const 0
    i64.store offset=8
    local.get $5
    i64.const 0
    i64.store offset=16
    local.get $0
    f32.const 0
    f32.lt
    global.get $logic/obstacles-manager/MAP_WIDTH
    local.get $0
    f32.le
    i32.or
    local.get $1
    f32.const 0
    f32.lt
    i32.or
    global.get $logic/obstacles-manager/MAP_HEIGHT
    local.get $1
    f32.le
    i32.or
    br_if $folding-inner1
    global.get $~lib/memory/__stack_pointer
    local.tee $5
    global.get $logic/obstacles-manager/innerBoundaries
    global.get $logic/obstacles-manager/outerBoundaries
    local.get $2
    select
    local.tee $6
    i32.store
    local.get $0
    f32.const 300
    f32.div
    i32.trunc_f32_s
    local.tee $2
    global.get $logic/obstacles-manager/OBSTACLES_MAP_WIDTH
    local.get $1
    f32.const 300
    f32.div
    i32.trunc_f32_s
    i32.mul
    i32.add
    local.set $7
    local.get $5
    i32.const 4
    i32.sub
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    i32.const 6788
    i32.lt_s
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    i32.const 0
    i32.store
    local.get $6
    i32.load offset=12
    local.get $7
    i32.le_u
    if
     i32.const 1360
     i32.const 1632
     i32.const 114
     i32.const 42
     call $~lib/builtins/abort
     unreachable
    end
    global.get $~lib/memory/__stack_pointer
    local.tee $8
    local.get $6
    i32.load offset=4
    local.get $7
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $6
    i32.store
    local.get $8
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $5
    local.get $6
    i32.store offset=4
    local.get $6
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 24
     i32.add
     global.set $~lib/memory/__stack_pointer
     i32.const 1
     return
    end
    local.get $6
    i32.load offset=12
    i32.eqz
    br_if $folding-inner1
    global.get $~lib/memory/__stack_pointer
    local.tee $5
    call $logic/geom-types/Line#constructor
    local.tee $7
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    i32.const 0
    call $logic/geom-types/Point#constructor
    local.tee $8
    i32.store offset=12
    local.get $8
    f32.const -1
    global.get $logic/obstacles-manager/MAP_WIDTH
    f32.const 1
    f32.add
    global.get $logic/obstacles-manager/OBSTACLES_MAP_WIDTH_HALF
    local.get $2
    i32.ge_s
    select
    f32.store
    local.get $8
    local.get $1
    f32.store offset=4
    local.get $7
    local.get $8
    i32.store
    local.get $8
    if
     local.get $7
     local.get $8
     i32.const 0
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 0
    call $logic/geom-types/Point#constructor
    local.tee $2
    i32.store offset=16
    local.get $2
    local.get $0
    f32.store
    local.get $2
    local.get $1
    f32.store offset=4
    local.get $7
    local.get $2
    i32.store offset=4
    local.get $2
    if
     local.get $7
     local.get $2
     i32.const 0
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    local.get $5
    local.get $7
    i32.store offset=20
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.sub
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    i32.const 6788
    i32.lt_s
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    i32.const 0
    i32.store
    loop $for-loop|0
     local.get $6
     i32.load offset=12
     local.get $4
     i32.gt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.load offset=4
      local.get $4
      i32.const 2
      i32.shl
      i32.add
      i32.load
      local.tee $2
      i32.store
      local.get $3
      i32.const 1
      i32.add
      local.get $3
      local.get $7
      local.get $2
      call $logic/geom-utils/checkIntersection<logic/geom-types/Line,logic/geom-types/Line>
      select
      local.set $3
      local.get $4
      i32.const 1
      i32.add
      local.set $4
      br $for-loop|0
     end
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    i32.const 24
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $3
    i32.const 1
    i32.and
    return
   end
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $~lib/staticarray/StaticArray<~lib/staticarray/StaticArray<logic/geom-types/Point>>#__get (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 2
  i32.shr_u
  local.get $1
  i32.le_u
  if
   i32.const 1360
   i32.const 1104
   i32.const 118
   i32.const 41
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.const 2
  i32.shl
  local.get $0
  i32.add
  i32.load
  local.tee $0
  i32.store
  local.get $0
  i32.eqz
  if
   i32.const 2256
   i32.const 1104
   i32.const 122
   i32.const 40
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/array/Array<logic/geom-types/UniquePoint>#slice (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i32.const 0
  i32.store
  i32.const 0
  local.get $0
  i32.load offset=12
  local.tee $2
  local.get $2
  i32.const 0
  i32.gt_s
  select
  local.set $3
  local.get $1
  local.get $2
  local.get $3
  i32.sub
  local.tee $1
  i32.const 0
  local.get $1
  i32.const 0
  i32.gt_s
  select
  local.tee $2
  i32.const 19
  i32.const 0
  call $~lib/rt/__newArray
  local.tee $4
  i32.store
  local.get $4
  i32.load offset=4
  local.set $1
  local.get $0
  i32.load offset=4
  local.get $3
  i32.const 2
  i32.shl
  i32.add
  local.set $3
  i32.const 0
  local.set $0
  local.get $2
  i32.const 2
  i32.shl
  local.set $2
  loop $while-continue|0
   local.get $0
   local.get $2
   i32.lt_u
   if
    local.get $0
    local.get $1
    i32.add
    local.get $0
    local.get $3
    i32.add
    i32.load
    local.tee $5
    i32.store
    local.get $5
    if
     local.get $4
     local.get $5
     i32.const 1
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    local.get $0
    i32.const 4
    i32.add
    local.set $0
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $4
 )
 (func $logic/track-manager/QueueItem#constructor (result i32)
  (local $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 16
  i32.const 56
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  f32.const 0
  f32.store offset=8
  local.get $0
  f32.const 0
  f32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/array/Array<logic/track-manager/QueueItem>#slice (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.load offset=12
  local.set $4
  local.get $1
  i32.const 0
  i32.lt_s
  if (result i32)
   local.get $1
   local.get $4
   i32.add
   local.tee $1
   i32.const 0
   local.get $1
   i32.const 0
   i32.gt_s
   select
  else
   local.get $1
   local.get $4
   local.get $1
   local.get $4
   i32.lt_s
   select
  end
  local.set $5
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.const 0
  i32.lt_s
  if (result i32)
   local.get $2
   local.get $4
   i32.add
   local.tee $1
   i32.const 0
   local.get $1
   i32.const 0
   i32.gt_s
   select
  else
   local.get $2
   local.get $4
   local.get $2
   local.get $4
   i32.lt_s
   select
  end
  local.get $5
  i32.sub
  local.tee $1
  i32.const 0
  local.get $1
  i32.const 0
  i32.gt_s
  select
  local.tee $1
  i32.const 57
  i32.const 0
  call $~lib/rt/__newArray
  local.tee $2
  i32.store
  local.get $2
  i32.load offset=4
  local.set $4
  local.get $0
  i32.load offset=4
  local.get $5
  i32.const 2
  i32.shl
  i32.add
  local.set $0
  local.get $1
  i32.const 2
  i32.shl
  local.set $1
  loop $while-continue|0
   local.get $1
   local.get $3
   i32.gt_u
   if
    local.get $3
    local.get $4
    i32.add
    local.get $0
    local.get $3
    i32.add
    i32.load
    local.tee $5
    i32.store
    local.get $5
    if
     local.get $2
     local.get $5
     i32.const 1
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    local.get $3
    i32.const 4
    i32.add
    local.set $3
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $logic/squads-grid-manager/pointToGridFnc (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i32.const 0
  i32.store
  local.get $1
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  f32.load
  global.get $logic/squads-grid-manager/gridMapScaleX
  f32.mul
  f32.floor
  f32.store
  local.get $1
  local.get $0
  f32.load offset=4
  global.get $logic/squads-grid-manager/gridMapScaleY
  f32.mul
  f32.floor
  f32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $~lib/array/Array<i32>#map<~lib/array/Array<logic/squad/Squad>> (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $3
  i64.const 0
  i64.store
  local.get $3
  local.get $0
  i32.load offset=12
  local.tee $3
  i32.const 59
  i32.const 0
  call $~lib/rt/__newArray
  local.tee $6
  i32.store
  local.get $6
  i32.load offset=4
  local.set $4
  loop $for-loop|0
   local.get $3
   local.get $0
   i32.load offset=12
   local.tee $5
   local.get $3
   local.get $5
   i32.lt_s
   select
   local.get $2
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.const 2
    i32.shl
    local.tee $5
    local.get $0
    i32.load offset=4
    i32.add
    i32.load
    local.get $2
    local.get $0
    local.get $1
    i32.load
    call_indirect $0 (type $i32_i32_i32_=>_i32)
    local.tee $7
    i32.store offset=4
    local.get $4
    local.get $5
    i32.add
    local.get $7
    i32.store
    local.get $7
    if
     local.get $6
     local.get $7
     i32.const 1
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $6
 )
 (func $~lib/array/Array<~lib/array/Array<logic/squad/Squad>>#flat (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  local.get $0
  i32.load offset=4
  local.set $3
  local.get $0
  i32.load offset=12
  local.set $4
  i32.const 0
  local.set $0
  loop $for-loop|0
   local.get $0
   local.get $4
   i32.lt_s
   if
    local.get $0
    i32.const 2
    i32.shl
    local.get $3
    i32.add
    i32.load
    local.tee $2
    if (result i32)
     local.get $2
     i32.load offset=12
    else
     i32.const 0
    end
    local.get $5
    i32.add
    local.set $5
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $5
  i32.const 2
  i32.shl
  local.tee $0
  i32.const 0
  call $~lib/rt/itcms/__new
  local.tee $6
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.const 23
  call $~lib/rt/itcms/__new
  local.tee $2
  i32.store offset=4
  local.get $2
  local.get $5
  i32.store offset=12
  local.get $2
  local.get $0
  i32.store offset=8
  local.get $2
  local.get $6
  i32.store offset=4
  local.get $2
  local.get $6
  i32.store
  local.get $6
  if
   local.get $2
   local.get $6
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  i32.const 0
  local.set $0
  loop $for-loop|1
   local.get $0
   local.get $4
   i32.lt_s
   if
    local.get $0
    i32.const 2
    i32.shl
    local.get $3
    i32.add
    i32.load
    local.tee $7
    if
     local.get $1
     local.get $6
     i32.add
     local.get $7
     i32.load offset=4
     local.get $7
     i32.load offset=12
     i32.const 2
     i32.shl
     local.tee $7
     call $~lib/memory/memory.copy
     local.get $1
     local.get $7
     i32.add
     local.set $1
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|1
   end
  end
  i32.const 0
  local.set $0
  loop $for-loop|2
   local.get $0
   local.get $5
   i32.lt_s
   if
    local.get $0
    i32.const 2
    i32.shl
    local.get $6
    i32.add
    i32.load
    local.tee $1
    if
     local.get $6
     local.get $1
     i32.const 1
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|2
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $logic/bullets-manager/getBulletsRepresentation~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i64.const 0
  i64.store
  local.get $2
  i32.const 5
  i32.const 46
  i32.const 0
  call $~lib/rt/__newArray
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.load offset=4
  i32.store offset=4
  local.get $1
  i32.load offset=4
  local.get $0
  f32.load offset=12
  f32.store
  local.get $1
  i32.load offset=4
  local.get $0
  f32.load
  f32.store offset=4
  local.get $1
  i32.load offset=4
  local.get $0
  f32.load offset=4
  f32.store offset=8
  local.get $1
  i32.load offset=4
  local.get $0
  f32.load offset=8
  f32.store offset=12
  local.get $1
  i32.load offset=4
  local.get $0
  f32.load offset=16
  f32.store offset=16
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $logic/convert-coords-between-logic-and-visual/convertVisualCoordsToLogic (param $0 f32) (param $1 f32) (result i32)
  (local $2 i32)
  (local $3 f32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  global.get $logic/index/mapHeightGlob
  local.get $1
  f32.const 0.5199999809265137
  f32.div
  local.tee $1
  f32.sub
  call $~lib/math/NativeMathf.atan2
  f32.const -0.6499999761581421
  f32.sub
  local.set $3
  local.get $0
  global.get $logic/index/mapHeightGlob
  local.get $1
  f32.sub
  call $~lib/math/NativeMathf.hypot
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store
  local.get $2
  local.get $3
  call $~lib/math/NativeMathf.sin
  local.get $0
  f32.mul
  f32.store
  local.get $2
  local.get $3
  call $~lib/math/NativeMathf.cos
  f32.neg
  local.get $0
  f32.mul
  global.get $logic/index/mapHeightGlob
  f32.add
  f32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $~lib/array/Array<i32>#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  i32.const 16
  i32.const 34
  call $~lib/rt/itcms/__new
  local.tee $1
  i32.store
  local.get $1
  i32.const 0
  i32.store
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $1
  i32.const 0
  i32.store offset=12
  local.get $0
  i32.const 268435455
  i32.gt_u
  if
   i32.const 1056
   i32.const 1632
   i32.const 70
   i32.const 60
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.const 8
  local.get $0
  i32.const 8
  i32.gt_u
  select
  i32.const 2
  i32.shl
  local.tee $2
  i32.const 0
  call $~lib/rt/itcms/__new
  local.tee $3
  i32.store offset=4
  local.get $1
  local.get $3
  i32.store
  local.get $3
  if
   local.get $1
   local.get $3
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  local.get $1
  local.get $3
  i32.store offset=4
  local.get $1
  local.get $2
  i32.store offset=8
  local.get $1
  local.get $0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $logic/convert-coords-between-logic-and-visual/getUnitOffset (param $0 i32) (result i32)
  (local $1 f32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i32.const 0
  i32.store
  local.get $0
  i32.load offset=40
  f32.load offset=16
  f32.const 1.2000000476837158
  f32.mul
  local.set $1
  local.get $2
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $0
  i32.store
  local.get $0
  f32.const 6.933185577392578
  call $~lib/math/NativeMathf.sin
  local.get $1
  f32.mul
  f32.store
  local.get $0
  f32.const 6.933185577392578
  call $~lib/math/NativeMathf.cos
  f32.neg
  local.get $1
  f32.mul
  f32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $logic/hex-positions/getSquadsCenter~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $3
  i32.const 0
  i32.store
  local.get $3
  i32.const 0
  call $logic/geom-types/Point#constructor
  local.tee $2
  i32.store
  local.get $2
  local.get $0
  f32.load
  local.get $1
  i32.load offset=36
  f32.load
  f32.add
  f32.store
  local.get $2
  local.get $0
  f32.load offset=4
  local.get $1
  i32.load offset=36
  f32.load offset=4
  f32.add
  f32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $logic/index/getSelectedUnitsIds~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $3
  i32.const 0
  i32.store
  local.get $3
  call $logic/geom-types/Line#constructor
  local.tee $3
  i32.store
  local.get $3
  local.get $0
  i32.store
  local.get $0
  if
   local.get $3
   local.get $0
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  local.get $3
  local.get $2
  i32.load offset=4
  local.get $1
  i32.const 1
  i32.add
  local.get $2
  i32.load offset=12
  i32.rem_s
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $0
  i32.store offset=4
  local.get $0
  if
   local.get $3
   local.get $0
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $3
 )
 (func $~lib/array/Array<u32>#concat (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.load offset=12
  local.tee $3
  local.get $1
  i32.load offset=12
  i32.const 0
  local.get $1
  select
  local.tee $2
  i32.add
  local.tee $4
  i32.const 268435455
  i32.gt_u
  if
   i32.const 1056
   i32.const 1632
   i32.const 244
   i32.const 60
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $4
  i32.const 50
  i32.const 0
  call $~lib/rt/__newArray
  local.tee $4
  i32.store
  local.get $4
  i32.load offset=4
  local.tee $5
  local.get $0
  i32.load offset=4
  local.get $3
  i32.const 2
  i32.shl
  local.tee $0
  call $~lib/memory/memory.copy
  local.get $0
  local.get $5
  i32.add
  local.get $1
  i32.load offset=4
  local.get $2
  i32.const 2
  i32.shl
  call $~lib/memory/memory.copy
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $4
 )
 (func $logic/index/debugSelecting~anonymous|0 (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i64.const 0
  i64.store
  local.get $2
  i32.const 2
  i32.const 46
  i32.const 0
  call $~lib/rt/__newArray
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.load offset=4
  i32.store offset=4
  local.get $1
  i32.load offset=4
  local.get $0
  f32.load
  f32.store
  local.get $1
  i32.load offset=4
  local.get $0
  f32.load offset=4
  f32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $export:logic/index/initUniverse (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 f32) (param $6 f32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $8
   local.tee $9
   local.get $0
   i32.store
   local.get $9
   local.get $1
   i32.store offset=4
   local.get $9
   local.get $2
   i32.store offset=8
   local.get $9
   local.get $3
   i32.store offset=12
   local.get $8
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 6788
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   loop $for-loop|0
    local.get $0
    i32.load offset=8
    i32.const 2
    i32.shr_u
    local.get $7
    i32.gt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     local.get $7
     call $~lib/typedarray/Float32Array#__get
     i32.trunc_f32_u
     local.get $7
     i32.eqz
     local.tee $8
     local.get $0
     local.get $7
     i32.const 1
     i32.add
     call $~lib/typedarray/Float32Array#__get
     local.get $0
     local.get $7
     i32.const 2
     i32.add
     call $~lib/typedarray/Float32Array#__get
     local.get $0
     local.get $7
     i32.const 3
     i32.add
     call $~lib/typedarray/Float32Array#__get
     call $logic/faction/Faction#constructor
     local.tee $9
     i32.store
     local.get $8
     if
      local.get $9
      global.set $logic/index/userFaction
     end
     global.get $~lib/memory/__stack_pointer
     i32.const 2528
     i32.store offset=4
     i32.const 2528
     local.get $9
     call $~lib/array/Array<logic/geom-types/Point>#push
     local.get $7
     i32.const 4
     i32.add
     local.set $7
     br $for-loop|0
    end
   end
   local.get $5
   f32.const 300
   f32.div
   f32.ceil
   i32.trunc_f32_s
   global.set $logic/obstacles-manager/OBSTACLES_MAP_WIDTH
   global.get $logic/obstacles-manager/OBSTACLES_MAP_WIDTH
   local.tee $0
   i32.const 2
   i32.div_s
   global.set $logic/obstacles-manager/OBSTACLES_MAP_WIDTH_HALF
   local.get $6
   f32.const 300
   f32.div
   f32.ceil
   i32.trunc_f32_s
   global.set $logic/obstacles-manager/OBSTACLES_MAP_HEIGHT
   global.get $logic/obstacles-manager/OBSTACLES_MAP_HEIGHT
   local.get $0
   i32.mul
   call $~lib/array/Array<~lib/array/Array<logic/geom-types/Line>|null>#constructor
   global.set $logic/obstacles-manager/outerBoundaries
   global.get $logic/obstacles-manager/OBSTACLES_MAP_WIDTH
   global.get $logic/obstacles-manager/OBSTACLES_MAP_HEIGHT
   i32.mul
   call $~lib/array/Array<~lib/array/Array<logic/geom-types/Line>|null>#constructor
   global.set $logic/obstacles-manager/innerBoundaries
   local.get $5
   global.set $logic/obstacles-manager/MAP_WIDTH
   local.get $6
   global.set $logic/obstacles-manager/MAP_HEIGHT
   local.get $1
   call $logic/obstacles-manager/getMap
   global.set $logic/obstacles-manager/outerBoundaries
   local.get $2
   call $logic/obstacles-manager/getMap
   global.set $logic/obstacles-manager/innerBoundaries
   local.get $2
   local.get $3
   local.get $4
   call $logic/track-manager/createPermanentTrackGraph
   local.get $5
   global.set $logic/index/mapWidthGlob
   local.get $6
   global.set $logic/index/mapHeightGlob
   local.get $5
   f32.const 3.3333334140479565e-03
   f32.mul
   f32.ceil
   i32.trunc_f32_s
   global.set $logic/squads-grid-manager/gridMapWidth
   local.get $6
   f32.const 3.3333334140479565e-03
   f32.mul
   f32.ceil
   i32.trunc_f32_s
   global.set $logic/squads-grid-manager/gridMapHeight
   global.get $logic/squads-grid-manager/gridMapWidth
   f32.convert_i32_s
   global.set $logic/squads-grid-manager/gridMapWidth_f32
   global.get $logic/squads-grid-manager/gridMapHeight
   f32.convert_i32_s
   global.set $logic/squads-grid-manager/gridMapHeight_f32
   global.get $logic/squads-grid-manager/gridMapWidth_f32
   local.get $5
   f32.div
   global.set $logic/squads-grid-manager/gridMapScaleX
   global.get $logic/squads-grid-manager/gridMapHeight_f32
   local.get $6
   f32.div
   global.set $logic/squads-grid-manager/gridMapScaleY
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 23200
  i32.const 23248
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:logic/index/moveUnits (param $0 i32) (param $1 f32) (param $2 f32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $1
  local.get $2
  call $logic/index/moveUnits
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:logic/index/useAbility (param $0 i32) (param $1 i32) (param $2 f32) (param $3 f32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $1
  local.get $2
  local.get $3
  call $logic/index/useAbility
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:logic/index/getAbilitiesCoolDowns (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 6788
  i32.lt_s
  if
   i32.const 23200
   i32.const 23248
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $1
  call $logic/index/getAbilitiesCoolDowns
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $byn-split-outlined-A$~lib/rt/itcms/__visit (param $0 i32)
  global.get $~lib/rt/itcms/white
  local.get $0
  i32.const 20
  i32.sub
  local.tee $0
  i32.load offset=4
  i32.const 3
  i32.and
  i32.eq
  if
   local.get $0
   call $~lib/rt/itcms/Object#makeGray
   global.get $~lib/rt/itcms/visitCount
   i32.const 1
   i32.add
   global.set $~lib/rt/itcms/visitCount
  end
 )
 (func $byn-split-outlined-A$~lib/rt/itcms/__link (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  local.get $0
  i32.eqz
  if
   i32.const 0
   i32.const 1232
   i32.const 294
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/itcms/white
  local.get $1
  i32.const 20
  i32.sub
  local.tee $1
  i32.load offset=4
  i32.const 3
  i32.and
  i32.eq
  if
   local.get $0
   i32.const 20
   i32.sub
   local.tee $0
   i32.load offset=4
   i32.const 3
   i32.and
   local.tee $3
   global.get $~lib/rt/itcms/white
   i32.eqz
   i32.eq
   if
    local.get $0
    local.get $1
    local.get $2
    select
    call $~lib/rt/itcms/Object#makeGray
   else
    global.get $~lib/rt/itcms/state
    i32.const 1
    i32.eq
    local.get $3
    i32.const 3
    i32.eq
    i32.and
    if
     local.get $1
     call $~lib/rt/itcms/Object#makeGray
    end
   end
  end
 )
)
