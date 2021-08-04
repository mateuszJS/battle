type i8 = number;
type i16 = number;
type i32 = number;
type i64 = bigint;
type isize = number;
type u8 = number;
type u16 = number;
type u32 = number;
type u64 = bigint;
type usize = number;
type f32 = number;
type f64 = number;
type bool = boolean | number;
export var Float32Array_ID: u32;
export var Uint32Array_ID: u32;
export function initUniverse(factionData: usize, obstacles: usize): void;
export function debugObstacles(): usize;
export function getFactoriesInitData(): usize;
export function getUniverseRepresentation(): usize;
export function createSquad(squadType: f32): void;
export function moveUnits(squadsIds: usize, x: f32, y: f32): usize;
export function getSelectedUnitsIds(x1: f32, y1: f32, x2: f32, y2: f32): usize;
export function useAbility(squadsIds: usize, abilityType: u8, x: f32, y: f32): void;
export function getAbilitiesCoolDowns(squadsIds: usize, abilityType: u8): usize;
export const memory: WebAssembly.Memory;
export function __new(size: usize, id: u32): usize;
export function __pin(ptr: usize): usize;
export function __unpin(ptr: usize): void;
export function __collect(): void;
export const __rtti_base: usize;
export const __setArgumentsLength: ((n: i32) => void) | undefined;
