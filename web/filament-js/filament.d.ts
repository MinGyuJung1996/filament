/*
 * Copyright (C) 2019 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * This file declares TypeScript annotations for Filament, which is implemented with an external
 * WASM library. The annotations declared in this file must match the bindings that are defined
 * in jsbindings. Note that clients are not required to use glMatrix, but we provide annotations for
 * those that do.
 */

import * as glm from "gl-matrix";

export as namespace Filament;

export function getSupportedFormatSuffix(desired: string): void;
export function init(assets: string[], onready?: (() => void) | null): void;
export function fetch(assets: string[], onDone?: (() => void) | null, onFetched?: ((name: string) => void) | null): void;
export function clearAssetCache(): void;

export const assets: {[url: string]: Uint8Array};

/**
 * May be either a string exactly containing a URL loaded with Filament.init() or Filament.fetch(),
 * OR any TypedArray such as Uint8Array, Float32Array, etc., all of which match the ArrayBufferView
 * interface.
 */
export type BufferReference = string | ArrayBufferView;

export type float2 = glm.vec2|number[];
export type float3 = glm.vec3|number[];
export type float4 = glm.vec4|number[];
export type double2 = glm.vec2|number[];
export type double3 = glm.vec3|number[];
export type double4 = glm.vec4|number[];
export type mat3 = glm.mat3|number[];
export type mat4 = glm.mat4|number[];
export type quat = glm.quat|number[];

/** A C++ std::vector. */
export interface Vector<T> {
    size(): number;
    get(i: number): T;
}

export function vectorToArray<T>(vector: Vector<T>): T[];

export class SwapChain {}
export class ColorGrading {
    public static Builder(): ColorGrading$Builder;
}

export interface Box {
    center: float3;
    halfExtent: float3;
}

export interface Aabb {
    min: float3;
    max: float3;
}

export interface Renderer$ClearOptions {
    clearColor?: float4;
    clear?: boolean;
    discard?: boolean;
}

export interface LightManager$ShadowOptions {
    mapSize?: number;
    shadowCascades?: number;
    constantBias?: number;
    normalBias?: number;
    shadowFar?: number;
    shadowNearHint?: number;
    shadowFarHint?: number;
    stable?: boolean;
    polygonOffsetConstant?: number;
    polygonOffsetSlope?: number;
    screenSpaceContactShadows?: boolean;
    stepCount?: number;
    maxShadowDistance?: number;
}

export function fitIntoUnitCube(box: Aabb): mat4;
export function multiplyMatrices(a: mat4, b: mat4): mat4;

// Clients should use the [PixelBuffer/CompressedPixelBuffer] helper function to contruct PixelBufferDescriptor objects.
export class driver$PixelBufferDescriptor {
    constructor(byteLength: number, format: PixelDataFormat, datatype: PixelDataType);
    constructor(byteLength: number, cdtype: CompressedPixelDataType, imageSize: number, compressed: boolean);
    getBytes(): ArrayBuffer;
}

// Clients should use createTextureFromKtx/ImageFile helper functions if low level control is not needed
export class Texture$Builder {
    public width(width: number): Texture$Builder;
    public height(height: number): Texture$Builder;
    public depth(depth: number): Texture$Builder;
    public levels(levels: number): Texture$Builder;
    public sampler(sampler: Texture$Sampler): Texture$Builder;
    public format(format: Texture$InternalFormat): Texture$Builder;
    public usage(usage: number): Texture$Builder;
    public build(engine: Engine) : Texture;
}

export class Texture {
    public static Builder(): Texture$Builder;
    public setImage(engine: Engine, level: number, pbd: driver$PixelBufferDescriptor): void;
    public setImageCube(engine: Engine, level: number, pbd: driver$PixelBufferDescriptor) : void;
    public generateMipmaps(engine: Engine) : void;
}

// TODO: Remove the entity type and just use integers for parity with Filament's Java bindings.
export class Entity {
    public getId(): number;
    public delete(): void;
}

export class Skybox {
    public setColor(color: float4): void;
    public getTexture(): Texture;
}

export class LightManager$Instance {
    public delete(): void;
}

export class RenderableManager$Instance {
    public delete(): void;
}

export class TransformManager$Instance {
    public delete(): void;
}

export class TextureSampler {
    constructor(minfilter: MinFilter, magfilter: MagFilter, wrapmode: WrapMode);
    public setAnisotropy(value: number): void;
    public setCompareMode(mode: CompareMode, func: CompareFunc): void;
}

export class MaterialInstance {
    public getName(): string;
    public setBoolParameter(name: string, value: boolean): void;
    public setFloatParameter(name: string, value: number): void;
    public setFloat2Parameter(name: string, value: float2): void;
    public setFloat3Parameter(name: string, value: float3): void;
    public setFloat4Parameter(name: string, value: float4): void;
    public setTextureParameter(name: string, value: Texture, sampler: TextureSampler): void;
    public setColor3Parameter(name: string, ctype: RgbType, value: float3): void;
    public setColor4Parameter(name: string, ctype: RgbaType, value: float4): void;
    public setPolygonOffset(scale: number, constant: number): void;
    public setMaskThreshold(threshold: number): void;
    public setDoubleSided(doubleSided: boolean): void;
    public setCullingMode(mode: CullingMode): void;
    public setColorWrite(enable: boolean): void;
    public setDepthWrite(enable: boolean): void;
    public setDepthCulling(enable: boolean): void;
}

export class EntityManager {
    public static get(): EntityManager;
    public create(): Entity;
}

export class VertexBuffer$Builder {
    public vertexCount(count: number): VertexBuffer$Builder;
    public bufferCount(count: number): VertexBuffer$Builder;
    public attribute(attrib: VertexAttribute, bufindex: number, atype: VertexBuffer$AttributeType,
            offset: number, stride: number): VertexBuffer$Builder;
    public enableBufferObjects(enabled: boolean): VertexBuffer$Builder;
    public normalized(attrib: VertexAttribute): VertexBuffer$Builder;
    public normalizedIf(attrib: VertexAttribute, normalized: boolean): VertexBuffer$Builder;
    public build(engine: Engine): VertexBuffer;
}

export class IndexBuffer$Builder {
    public indexCount(count: number): IndexBuffer$Builder;
    public bufferType(type: IndexBuffer$IndexType): IndexBuffer$Builder;
    public build(engine: Engine): IndexBuffer;
}

export class BufferObject$Builder {
    public size(byteCount: number): BufferObject$Builder;
    public bindingType(type: BufferObject$BindingType): BufferObject$Builder;
    public build(engine: Engine): BufferObject;
}

export class RenderableManager$Builder {
    public geometry(slot: number, ptype: RenderableManager$PrimitiveType, vb: VertexBuffer,
            ib: IndexBuffer): RenderableManager$Builder;
    public geometryOffset(slot: number, ptype: RenderableManager$PrimitiveType, vb: VertexBuffer,
            ib: IndexBuffer, offset: number, count: number): RenderableManager$Builder;
    public geometryMinMax(slot: number, ptype: RenderableManager$PrimitiveType, vb: VertexBuffer,
            ib: IndexBuffer, offset: number, minIndex: number, maxIndex: number, count: number): RenderableManager$Builder;
    public material(geo: number, minstance: MaterialInstance): RenderableManager$Builder;
    public boundingBox(box: Box): RenderableManager$Builder;
    public layerMask(select: number, values: number): RenderableManager$Builder;
    public priority(value: number): RenderableManager$Builder;
    public culling(enable: boolean): RenderableManager$Builder;
    public castShadows(enable: boolean): RenderableManager$Builder;
    public receiveShadows(enable: boolean): RenderableManager$Builder;
    public skinning(boneCount: number): RenderableManager$Builder;
    public skinningBones(transforms: RenderableManager$Bone[]): RenderableManager$Builder;
    public skinningMatrices(transforms: mat4[]): RenderableManager$Builder;
    public morphing(enable: boolean): RenderableManager$Builder;
    public blendOrder(index: number, order: number): RenderableManager$Builder;
    public build(engine: Engine, entity: Entity): void;
}

export class RenderTarget$Builder {
    public texture(attachment: RenderTarget$AttachmentPoint, texture: Texture): RenderTarget$Builder;
    public mipLevel(attachment: RenderTarget$AttachmentPoint, mipLevel: number): RenderTarget$Builder;
    public face(attachment: RenderTarget$AttachmentPoint, face: Texture$CubemapFace): RenderTarget$Builder;
    public layer(attachment: RenderTarget$AttachmentPoint, layer: number): RenderTarget$Builder;
    public build(engine: Engine): RenderTarget;
}

export class LightManager$Builder {
    public build(engine: Engine, entity: Entity): void;
    public castLight(enable: boolean): LightManager$Builder;
    public castShadows(enable: boolean): LightManager$Builder;
    public shadowOptions(options: LightManager$ShadowOptions): LightManager$Builder;
    public color(rgb: float3): LightManager$Builder;
    public direction(value: float3): LightManager$Builder;
    public intensity(value: number): LightManager$Builder;
    public falloff(value: number): LightManager$Builder;
    public position(value: float3): LightManager$Builder;
    public spotLightCone(inner: number, outer: number): LightManager$Builder;
    public sunAngularRadius(angularRadius: number): LightManager$Builder;
    public sunHaloFalloff(haloFalloff: number): LightManager$Builder;
    public sunHaloSize(haloSize: number): LightManager$Builder;
}

export class Skybox$Builder {
    public build(engine: Engine): Skybox;
    public color(rgba: float4): Skybox$Builder;
    public environment(envmap: Texture): Skybox$Builder;
    public showSun(show: boolean): Skybox$Builder;
}

export class LightManager {
    public hasComponent(entity: Entity): boolean;
    public getInstance(entity: Entity): LightManager$Instance;
    public static Builder(ltype: LightManager$Type): LightManager$Builder;
    public getType(instance: LightManager$Instance): LightManager$Type;
    public isDirectional(instance: LightManager$Instance): boolean;
    public isPointLight(instance: LightManager$Instance): boolean;
    public isSpotLight(instance: LightManager$Instance): boolean;
    public setPosition(instance: LightManager$Instance, value: float3): void;
    public getPosition(instance: LightManager$Instance): float3;
    public setDirection(instance: LightManager$Instance, value: float3): void;
    public getDirection(instance: LightManager$Instance): float3;
    public setColor(instance: LightManager$Instance, value: float3): void;
    public getColor(instance: LightManager$Instance): float3;
    public setIntensity(instance: LightManager$Instance, intensity: number): void;
    public setIntensityEnergy(instance: LightManager$Instance, watts: number, efficiency: number): void;
    public getIntensity(instance: LightManager$Instance): number;
    public setFalloff(instance: LightManager$Instance, radius: number): void;
    public getFalloff(instance: LightManager$Instance): number;
    public setShadowOptions(instance: LightManager$Instance, options: LightManager$ShadowOptions): void;
    public setSpotLightCone(instance: LightManager$Instance, inner: number, outer: number): void;
    public setSunAngularRadius(instance: LightManager$Instance, angularRadius: number): void;
    public getSunAngularRadius(instance: LightManager$Instance): number;
    public setSunHaloSize(instance: LightManager$Instance, haloSize: number): void;
    public getSunHaloSize(instance: LightManager$Instance): number;
    public setSunHaloFalloff(instance: LightManager$Instance, haloFalloff: number): void;
    public getSunHaloFalloff(instance: LightManager$Instance): number;
    public setShadowCaster(instance: LightManager$Instance, shadowCaster: boolean): number;
    public isShadowCaster(instance: LightManager$Instance): boolean;
}

export interface RenderableManager$Bone {
    unitQuaternion: quat;
    translation: float3;
}

export class RenderableManager {
    public hasComponent(entity: Entity): boolean;
    public getInstance(entity: Entity): RenderableManager$Instance;
    public static Builder(ngeos: number): RenderableManager$Builder;
    public destroy(entity: Entity): void;
    public setAxisAlignedBoundingBox(instance: RenderableManager$Instance, aabb: Box): void;
    public setLayerMask(instance: RenderableManager$Instance, select: number, values: number): void;
    public setPriority(instance: RenderableManager$Instance, priority: number): void;
    public setCastShadows(instance: RenderableManager$Instance, enable: boolean): void;
    public setReceiveShadows(inst: RenderableManager$Instance, enable: boolean): void;
    public isShadowCaster(instance: RenderableManager$Instance): boolean;
    public isShadowReceiver(instance: RenderableManager$Instance): boolean;
    public setBones(instance: RenderableManager$Instance, transforms: RenderableManager$Bone[],
            offset: number): void
    public setBonesFromMatrices(instance: RenderableManager$Instance, transforms: mat4[],
            offset: number): void
    public setMorphWeights(instance: RenderableManager$Instance, a: number, b: number, c: number,
            d: number): void;
    public getAxisAlignedBoundingBox(instance: RenderableManager$Instance): Box;
    public getPrimitiveCount(instance: RenderableManager$Instance): number;
    public setMaterialInstanceAt(instance: RenderableManager$Instance,
            primitiveIndex: number, materialInstance: MaterialInstance): void;
    public getMaterialInstanceAt(instance: RenderableManager$Instance, primitiveIndex: number):
            MaterialInstance;
    public setGeometryAt(instance: RenderableManager$Instance, primitiveIndex: number,
            type: RenderableManager$PrimitiveType, vertices: VertexBuffer, indices: IndexBuffer,
            offset: number, count: number): void;
    public setGeometryRangeAt(instance: RenderableManager$Instance, primitiveIndex: number,
            type: RenderableManager$PrimitiveType, offset: number, count: number): void;
    public setBlendOrderAt(instance: RenderableManager$Instance, primitiveIndex: number,
            order: number): void;
    public getEnabledAttributesAt(instance: RenderableManager$Instance,
            primitiveIndex: number): number;
}

export class VertexBuffer {
    public static Builder(): VertexBuffer$Builder;
    public setBufferAt(engine: Engine, bufindex: number, f32array: BufferReference,
            byteOffset?: number): void;
    public setBufferObjectAt(engine: Engine, bufindex: number, bo: BufferObject): void;
}

export class BufferObject {
    public static Builder(): BufferObject$Builder;
    public setBuffer(engine: Engine, data: BufferReference, byteOffset?: number): void;
}

export class IndexBuffer {
    public static Builder(): IndexBuffer$Builder;
    public setBuffer(engine: Engine, u16array: BufferReference, byteOffset?: number): void;
}

export class Renderer {
    public render(swapChain: SwapChain, view: View): void;
    public setClearOptions(options: Renderer$ClearOptions): void;
    public renderView(view: View): void;
    public beginFrame(swapChain: SwapChain): boolean;
    public endFrame(): void;
}

export class Material {
    public createInstance(): MaterialInstance;
    public createNamedInstance(name: string): MaterialInstance;
    public getDefaultInstance(): MaterialInstance;
    public getName(): string;
}

export class Frustum {
    constructor(pv: mat4);
    public setProjection(pv: mat4): void;
    public getNormalizedPlane(plane: Frustum$Plane): float4;
    public intersectsBox(box: Box): boolean;
    public intersectsSphere(sphere: float4): boolean;
}

export class Camera {
    public setProjection(proj: Camera$Projection, left: number, right: number, bottom: number,
            top: number, near: number, far: number): void;
    public setProjectionFov(fovInDegrees: number, aspect: number,
            near: number, far: number, fov: Camera$Fov): void;
    public setLensProjection(focalLength: number, aspect: number, near: number, far: number): void;
    public setCustomProjection(projection: mat4, near: number, far: number): void;
    public setScaling(scale: double2): void;
    public getProjectionMatrix(): mat4;
    public getCullingProjectionMatrix(): mat4;
    public getScaling(): double4;
    public getNear(): number;
    public getCullingFar(): number;
    public setModelMatrix(view: mat4): void;
    public lookAt(eye: float3, center: float3, up: float3): void;
    public getModelMatrix(): mat4;
    public getViewMatrix(): mat4;
    public getPosition(): float3;
    public getLeftVector(): float3;
    public getUpVector(): float3;
    public getForwardVector(): float3;
    public getFrustum(): Frustum;
    public setExposure(aperture: number, shutterSpeed: number, sensitivity: number): void;
    public setExposureDirect(exposure: number): void;
    public getAperture(): number;
    public getShutterSpeed(): number;
    public getSensitivity(): number;
    public getFocalLength(): number;
    public getFocusDistance(): number;
    public setFocusDistance(distance: number): void;
    public static inverseProjection(p: mat4): mat4;
    public static computeEffectiveFocalLength(focalLength: number, focusDistance: number) : number;
    public static computeEffectiveFov(fovInDegrees: number, focusDistance: number) : number;
}

export class ColorGrading$Builder {
    public quality(qualityLevel: ColorGrading$QualityLevel): ColorGrading$Builder;
    public toneMapping(toneMapping: ColorGrading$ToneMapping): ColorGrading$Builder;
    public whiteBalance(temperature: number, tint: number): ColorGrading$Builder;
    public channelMixer(outRed: float3, outGreen: float3, outBlue: float3): ColorGrading$Builder;
    public shadowsMidtonesHighlights(shadows: float4, midtones: float4, highlights: float4,
            ranges: float4): ColorGrading$Builder;
    public slopeOffsetPower(slope: float3, offset: float3, power: float3): ColorGrading$Builder;
    public contrast(contrast: number): ColorGrading$Builder;
    public vibrance(vibrance: number): ColorGrading$Builder;
    public saturation(saturation: number): ColorGrading$Builder;
    public curves(shadowGamma: float3, midPoint: float3,
            highlightScale: float3): ColorGrading$Builder;
    public build(engine: Engine): ColorGrading;
}

export class IndirectLight {
    public setIntensity(intensity: number): void;
    public getIntensity(): number;
    public setRotation(value: mat3): void;
    public getRotation(): mat3;
    public getReflectionsTexture(): Texture;
    public getIrradianceTexture(): Texture;
    public static getDirectionEstimate(f32array: any): float3;
    public static getColorEstimate(f32array: any, direction: float3): float4;
    shfloats: Array<number>;
}

export class IndirectLight$Builder {
    public reflections(cubemap: Texture): IndirectLight$Builder;
    public irradianceTex(cubemap: Texture): IndirectLight$Builder;
    public irradianceSh(nbands: number, f32array: any): IndirectLight$Builder;
    public intensity(value: number): IndirectLight$Builder;
    public rotation(value: mat3): IndirectLight$Builder;
    public build(engine: Engine): IndirectLight;
}

export class IcoSphere {
    constructor(nsubdivs: number);
    public subdivide(): void;
    vertices: Float32Array;
    tangents: Int16Array;
    triangles: Uint16Array;
}

export class Scene {
    public addEntity(entity: Entity): void;
    public addEntities(entities: Entity[]): void;
    public getLightCount(): number;
    public getRenderableCount(): number;
    public remove(entity: Entity): void;
    public removeEntities(entities: Entity[]): void;
    public setIndirectLight(ibl: IndirectLight|null): void;
    public setSkybox(sky: Skybox|null): void;
}

export class RenderTarget {
    public getMipLevel(): number;
    public getFace(): Texture$CubemapFace;
    public getLayer(): number;
    public static Builder() : RenderTarget$Builder;
}

export class View {
    public setCamera(camera: Camera): void;
    public setColorGrading(colorGrading: ColorGrading): void;
    public setScene(scene: Scene): void;
    public setViewport(viewport: float4): void;
    public setVisibleLayers(select: number, values: number): void;
    public setRenderTarget(renderTarget: RenderTarget): void;
    public setAmbientOcclusionOptions(options: View$AmbientOcclusionOptions): void;
    public setDepthOfFieldOptions(options: View$DepthOfFieldOptions): void;
    public setMultiSampleAntiAliasingOptions(options: View$MultiSampleAntiAliasingOptions): void;
    public setTemporalAntiAliasingOptions(options: View$TemporalAntiAliasingOptions): void;
    public setScreenSpaceReflectionsOptions(options: View$ScreenSpaceReflectionsOptions): void;
    public setBloomOptions(options: View$BloomOptions): void;
    public setFogOptions(options: View$FogOptions): void;
    public setVignetteOptions(options: View$VignetteOptions): void;
    public setGuardBandOptions(options: View$GuardBandOptions): void;
    public setAmbientOcclusion(ambientOcclusion: View$AmbientOcclusion): void;
    public getAmbientOcclusion(): View$AmbientOcclusion;
    public setBlendMode(mode: View$BlendMode): void;
    public getBlendMode(): View$BlendMode;
    public setPostProcessingEnabled(enabled: boolean): void;
    public setAntiAliasing(antialiasing: View$AntiAliasing): void;
}

export class TransformManager {
    public hasComponent(entity: Entity): boolean;
    public getInstance(entity: Entity): TransformManager$Instance;
    public create(entity: Entity): void;
    public destroy(entity: Entity): void;
    public setParent(instance: TransformManager$Instance, parent: TransformManager$Instance): void;
    public setTransform(instance: TransformManager$Instance, xform: mat4): void;
    public getTransform(instance: TransformManager$Instance): mat4;
    public getWorldTransform(instance: TransformManager$Instance): mat4;
    public openLocalTransformTransaction(): void;
    public commitLocalTransformTransaction(): void;
}

interface Filamesh {
    renderable: Entity;
    vertexBuffer: VertexBuffer;
    indexBuffer: IndexBuffer;
}

export class Engine {
    public static create(canvas: HTMLCanvasElement, contextOptions?: object): Engine;
    public execute(): void;
    public createCamera(entity: Entity): Camera;
    public createMaterial(urlOrBuffer: BufferReference): Material;
    public createRenderer(): Renderer;
    public createScene(): Scene;
    public createSwapChain(): SwapChain;
    public createTextureFromJpeg(urlOrBuffer: BufferReference, options?: object): Texture;
    public createTextureFromPng(urlOrBuffer: BufferReference, options?: object): Texture;

    public createIblFromKtx1(urlOrBuffer: BufferReference): IndirectLight;
    public createSkyFromKtx1(urlOrBuffer: BufferReference): Skybox;
    public createTextureFromKtx1(urlOrBuffer: BufferReference, options?: object): Texture;
    public createTextureFromKtx2(urlOrBuffer: BufferReference, options?: object): Texture;

    public createView(): View;

    public createAssetLoader(): gltfio$AssetLoader;

    public destroySwapChain(swapChain: SwapChain): void;
    public destroyRenderer(renderer: Renderer): void;
    public destroyView(view: View): void;
    public destroyScene(scene: Scene): void;
    public destroyCameraComponent(camera: Entity): void;
    public destroyMaterial(material: Material): void;
    public destroyEntity(entity: Entity): void;
    public destroyIndexBuffer(indexBuffer: IndexBuffer): void;
    public destroyIndirectLight(indirectLight: IndirectLight): void;
    public destroyMaterialInstance(materialInstance: MaterialInstance): void;
    public destroyRenderTarget(renderTarget: RenderTarget): void;
    public destroySkybox(skybox: Skybox): void;
    public destroyTexture(texture: Texture): void;
    public destroyColorGrading(colorGrading: ColorGrading): void;

    public getCameraComponent(entity: Entity): Camera;
    public getLightManager(): LightManager;
    public destroyVertexBuffer(vertexBuffer: VertexBuffer): void;
    public getRenderableManager(): RenderableManager;
    public getSupportedFormatSuffix(suffix: string): void;
    public getTransformManager(): TransformManager;
    public init(assets: string[], onready: () => void): void;
    public loadFilamesh(urlOrBuffer: BufferReference, definstance?: MaterialInstance, matinstances?: object): Filamesh;
}

export class Ktx2Reader {
    constructor(engine: Engine, quiet: boolean)
    public requestFormat(format: Texture$InternalFormat): void;
    public unrequestFormat(format: Texture$InternalFormat): void;
    public load(urlOrBuffer: BufferReference, transfer: TransferFunction): Texture|null;
}

export class gltfio$AssetLoader {
    public createAssetFromJson(urlOrBuffer: BufferReference): gltfio$FilamentAsset;
    public createAssetFromBinary(urlOrBuffer: BufferReference): gltfio$FilamentAsset;
    public createInstancedAsset(urlOrBuffer: BufferReference,
            instances: (gltfio$FilamentInstance | null)[]): gltfio$FilamentAsset;
    public destroyAsset(asset: gltfio$FilamentAsset): void;
    public createInstance(asset: gltfio$FilamentAsset): (gltfio$FilamentInstance | null);
    public delete(): void;
}

export class gltfio$FilamentAsset {
    public loadResources(onDone: () => void|null, onFetched: (s: string) => void|null,
            basePath: string|null, asyncInterval: number|null, options?: object): void;
    public getEntities(): Entity[];
    public getEntitiesByName(name: string): Entity[];
    public getEntityByName(name: string): Entity;
    public getEntitiesByPrefix(name: string): Entity[];
    public getLightEntities(): Entity[];
    public getRenderableEntities(): Entity[];
    public getCameraEntities(): Entity[];
    public getRoot(): Entity;
    public popRenderable(): Entity;
    public getMaterialInstances(): Vector<MaterialInstance>;
    public getResourceUris(): Vector<string>;
    public getBoundingBox(): Aabb;
    public getName(entity: Entity): string;
    public getExtras(entity: Entity): string;
    public getAnimator(): gltfio$Animator;
    public getWireframe(): Entity;
    public getEngine(): Engine;
    public releaseSourceData(): void;
}

export class gltfio$FilamentInstance {
    public getAsset(): gltfio$FilamentAsset;
    public getEntities(): Vector<Entity>;
    public getRoot(): Entity;
    public getAnimator(): gltfio$Animator;
}

export class gltfio$Animator {
    public applyAnimation(index: number): void;
    public updateBoneMatrices(): void;
    public resetBoneMatrices(): void;
    public getAnimationCount(): number;
    public getAnimationDuration(index: number): number;
    public getAnimationName(index: number): string;
}

export class SurfaceOrientation$Builder {
    public constructor();
    public vertexCount(count: number): SurfaceOrientation$Builder;
    public normals(vec3array: Float32Array, stride: number): SurfaceOrientation$Builder;
    public uvs(vec2array: Float32Array, stride: number): SurfaceOrientation$Builder;
    public positions(vec3array: Float32Array, stride: number): SurfaceOrientation$Builder;
    public triangleCount(count: number): SurfaceOrientation$Builder;
    public triangles16(indices: Uint16Array): SurfaceOrientation$Builder;
    public triangles32(indices: Uint32Array): SurfaceOrientation$Builder;
    public build(): SurfaceOrientation;
}

export class SurfaceOrientation {
    public getQuats(quatCount: number): Int16Array;
    public getQuatsHalf4(quatCount: number): Uint16Array;
    public getQuatsFloat4(quatCount: number): Float32Array;
    public delete(): void;
}

export enum Frustum$Plane {
    LEFT,
    RIGHT,
    BOTTOM,
    TOP,
    FAR,
    NEAR,
}

export enum Camera$Fov {
    VERTICAL,
    HORIZONTAL,
}

export enum Camera$Projection {
    PERSPECTIVE,
    ORTHO,
}

 export enum ColorGrading$QualityLevel {
    LOW,
    MEDIUM,
    HIGH,
    ULTRA,
 }

export enum ColorGrading$ToneMapping {
    LINEAR,
    ACES_LEGACY,
    ACES,
    FILMIC,
    EVILS,
    REINHARD,
    DISPLAY_RANGE,
}

export enum CompressedPixelDataType {
    EAC_R11,
    EAC_R11_SIGNED,
    EAC_RG11,
    EAC_RG11_SIGNED,
    ETC2_RGB8,
    ETC2_SRGB8,
    ETC2_RGB8_A1,
    ETC2_SRGB8_A1,
    ETC2_EAC_RGBA8,
    ETC2_EAC_SRGBA8,
    DXT1_RGB,
    DXT1_RGBA,
    DXT3_RGBA,
    DXT5_RGBA,
    DXT1_SRGB,
    DXT1_SRGBA,
    DXT3_SRGBA,
    DXT5_SRGBA,
    RGBA_ASTC_4x4,
    RGBA_ASTC_5x4,
    RGBA_ASTC_5x5,
    RGBA_ASTC_6x5,
    RGBA_ASTC_6x6,
    RGBA_ASTC_8x5,
    RGBA_ASTC_8x6,
    RGBA_ASTC_8x8,
    RGBA_ASTC_10x5,
    RGBA_ASTC_10x6,
    RGBA_ASTC_10x8,
    RGBA_ASTC_10x10,
    RGBA_ASTC_12x10,
    RGBA_ASTC_12x12,
    SRGB8_ALPHA8_ASTC_4x4,
    SRGB8_ALPHA8_ASTC_5x4,
    SRGB8_ALPHA8_ASTC_5x5,
    SRGB8_ALPHA8_ASTC_6x5,
    SRGB8_ALPHA8_ASTC_6x6,
    SRGB8_ALPHA8_ASTC_8x5,
    SRGB8_ALPHA8_ASTC_8x6,
    SRGB8_ALPHA8_ASTC_8x8,
    SRGB8_ALPHA8_ASTC_10x5,
    SRGB8_ALPHA8_ASTC_10x6,
    SRGB8_ALPHA8_ASTC_10x8,
    SRGB8_ALPHA8_ASTC_10x10,
    SRGB8_ALPHA8_ASTC_12x10,
    SRGB8_ALPHA8_ASTC_12x12,
}

export enum IndexBuffer$IndexType {
    USHORT,
    UINT,
}

export enum BufferObject$BindingType {
    VERTEX,
}

export enum LightManager$Type {
    SUN,
    DIRECTIONAL,
    POINT,
    FOCUSED_SPOT,
    SPOT,
}

export enum MagFilter {
    NEAREST,
    LINEAR,
}

export enum MinFilter {
    NEAREST,
    LINEAR,
    NEAREST_MIPMAP_NEAREST,
    LINEAR_MIPMAP_NEAREST,
    NEAREST_MIPMAP_LINEAR,
    LINEAR_MIPMAP_LINEAR,
}

export enum CompareMode {
    NONE,
    COMPARE_TO_TEXTURE,
}

export enum CompareFunc {
    LESS_EQUAL,
    GREATER_EQUAL,
    LESS,
    GREATER,
    EQUAL,
    NOT_EQUAL,
    ALWAYS,
    NEVER,
}

export enum CullingMode {
    NONE,
    FRONT,
    BACK,
    FRONT_AND_BACK,
}

export enum PixelDataFormat {
    R,
    R_INTEGER,
    RG,
    RG_INTEGER,
    RGB,
    RGB_INTEGER,
    RGBA,
    RGBA_INTEGER,
    UNUSED,
    DEPTH_COMPONENT,
    DEPTH_STENCIL,
    ALPHA,
}

export enum PixelDataType {
    UBYTE,
    BYTE,
    USHORT,
    SHORT,
    UINT,
    INT,
    HALF,
    FLOAT,
    UINT_10F_11F_11F_REV,
    USHORT_565,
}

export enum RenderableManager$PrimitiveType {
    POINTS,
    LINES,
    LINE_STRIP,
    TRIANGLES,
    TRIANGLE_STRIP,
    NONE,
}

export enum RgbType {
    sRGB,
    LINEAR,
}

export enum RgbaType {
    sRGB,
    LINEAR,
    PREMULTIPLIED_sRGB,
    PREMULTIPLIED_LINEAR,
}

export enum Texture$InternalFormat {
    R8,
    R8_SNORM,
    R8UI,
    R8I,
    STENCIL8,
    R16F,
    R16UI,
    R16I,
    RG8,
    RG8_SNORM,
    RG8UI,
    RG8I,
    RGB565,
    RGB9_E5,
    RGB5_A1,
    RGBA4,
    DEPTH16,
    RGB8,
    SRGB8,
    RGB8_SNORM,
    RGB8UI,
    RGB8I,
    DEPTH24,
    R32F,
    R32UI,
    R32I,
    RG16F,
    RG16UI,
    RG16I,
    R11F_G11F_B10F,
    RGBA8,
    SRGB8_A8,
    RGBA8_SNORM,
    UNUSED,
    RGB10_A2,
    RGBA8UI,
    RGBA8I,
    DEPTH32F,
    DEPTH24_STENCIL8,
    DEPTH32F_STENCIL8,
    RGB16F,
    RGB16UI,
    RGB16I,
    RG32F,
    RG32UI,
    RG32I,
    RGBA16F,
    RGBA16UI,
    RGBA16I,
    RGB32F,
    RGB32UI,
    RGB32I,
    RGBA32F,
    RGBA32UI,
    RGBA32I,
    EAC_R11,
    EAC_R11_SIGNED,
    EAC_RG11,
    EAC_RG11_SIGNED,
    ETC2_RGB8,
    ETC2_SRGB8,
    ETC2_RGB8_A1,
    ETC2_SRGB8_A1,
    ETC2_EAC_RGBA8,
    ETC2_EAC_SRGBA8,
    DXT1_RGB,
    DXT1_RGBA,
    DXT3_RGBA,
    DXT5_RGBA,
    DXT1_SRGB,
    DXT1_SRGBA,
    DXT3_SRGBA,
    DXT5_SRGBA,
    RGBA_ASTC_4x4,
    RGBA_ASTC_5x4,
    RGBA_ASTC_5x5,
    RGBA_ASTC_6x5,
    RGBA_ASTC_6x6,
    RGBA_ASTC_8x5,
    RGBA_ASTC_8x6,
    RGBA_ASTC_8x8,
    RGBA_ASTC_10x5,
    RGBA_ASTC_10x6,
    RGBA_ASTC_10x8,
    RGBA_ASTC_10x10,
    RGBA_ASTC_12x10,
    RGBA_ASTC_12x12,
    SRGB8_ALPHA8_ASTC_4x4,
    SRGB8_ALPHA8_ASTC_5x4,
    SRGB8_ALPHA8_ASTC_5x5,
    SRGB8_ALPHA8_ASTC_6x5,
    SRGB8_ALPHA8_ASTC_6x6,
    SRGB8_ALPHA8_ASTC_8x5,
    SRGB8_ALPHA8_ASTC_8x6,
    SRGB8_ALPHA8_ASTC_8x8,
    SRGB8_ALPHA8_ASTC_10x5,
    SRGB8_ALPHA8_ASTC_10x6,
    SRGB8_ALPHA8_ASTC_10x8,
    SRGB8_ALPHA8_ASTC_10x10,
    SRGB8_ALPHA8_ASTC_12x10,
    SRGB8_ALPHA8_ASTC_12x12,
}

export enum Texture$Sampler {
    SAMPLER_2D,
    SAMPLER_CUBEMAP,
    SAMPLER_EXTERNAL,
}

// This enum is a bit different the others because it can be used in a bitfield.
// It is a "const enum" which means TypeScript will simply create a constant for each member.
// It does not contain the $ delimiter to avoid interference with the embind class.
export const enum TextureUsage {
    COLOR_ATTACHMENT = 1,
    DEPTH_ATTACHMENT = 2,
    STENCIL_ATTACHMENT = 4,
    UPLOADABLE = 8,
    SAMPLEABLE = 16,
    SUBPASS_INPUT = 32,
    DEFAULT = UPLOADABLE | SAMPLEABLE,
}

export enum Texture$CubemapFace {
    POSITIVE_X,
    NEGATIVE_X,
    POSITIVE_Y,
    NEGATIVE_Y,
    POSITIVE_Z,
    NEGATIVE_Z,
}

export enum RenderTarget$AttachmentPoint {
    COLOR,
    DEPTH,
}

export enum View$AmbientOcclusion {
    NONE,
    SSAO,
}

export enum VertexAttribute {
    POSITION = 0,
    TANGENTS = 1,
    COLOR = 2,
    UV0 = 3,
    UV1 = 4,
    BONE_INDICES = 5,
    BONE_WEIGHTS = 6,
    UNUSED = 7,
    CUSTOM0 = 8,
    CUSTOM1 = 9,
    CUSTOM2 = 10,
    CUSTOM3 = 11,
    CUSTOM4 = 12,
    CUSTOM5 = 13,
    CUSTOM6 = 14,
    CUSTOM7 = 15,
    MORPH_POSITION_0 = CUSTOM0,
    MORPH_POSITION_1 = CUSTOM1,
    MORPH_POSITION_2 = CUSTOM2,
    MORPH_POSITION_3 = CUSTOM3,
    MORPH_TANGENTS_0 = CUSTOM4,
    MORPH_TANGENTS_1 = CUSTOM5,
    MORPH_TANGENTS_2 = CUSTOM6,
    MORPH_TANGENTS_3 = CUSTOM7,
}

export enum VertexBuffer$AttributeType {
    BYTE,
    BYTE2,
    BYTE3,
    BYTE4,
    UBYTE,
    UBYTE2,
    UBYTE3,
    UBYTE4,
    SHORT,
    SHORT2,
    SHORT3,
    SHORT4,
    USHORT,
    USHORT2,
    USHORT3,
    USHORT4,
    INT,
    UINT,
    FLOAT,
    FLOAT2,
    FLOAT3,
    FLOAT4,
    HALF,
    HALF2,
    HALF3,
    HALF4,
}

export enum WrapMode {
    CLAMP_TO_EDGE,
    REPEAT,
    MIRRORED_REPEAT,
}

export enum Ktx2Reader$TransferFunction {
    LINEAR,
    sRGB,
}

export enum Ktx2Reader$Result {
    SUCCESS,
    COMPRESSED_TRANSCODE_FAILURE,
    UNCOMPRESSED_TRANSCODE_FAILURE,
    FORMAT_UNSUPPORTED,
    FORMAT_ALREADY_REQUESTED,
}

export function _malloc(size: number): number;
export function _free(size: number): void;

interface HeapInterface {
    set(buffer: any, pointer: number): any;
    subarray(buffer: any, offset: number): any;
}

export const HEAPU8 : HeapInterface;

// The remainder of this file is generated by codegen-options

export enum View$QualityLevel {
    LOW,
    MEDIUM,
    HIGH,
    ULTRA,
}

export enum View$BlendMode {
    OPAQUE,
    TRANSLUCENT,
}

export interface View$DynamicResolutionOptions {
    minScale?: float2; // minimum scale factors in x and y
    maxScale?: float2; // maximum scale factors in x and y
    sharpness?: number; // sharpness when QualityLevel::MEDIUM or higher is used [0 (disabled), 1 (sharpest)]
    enabled?: boolean; // enable or disable dynamic resolution
    homogeneousScaling?: boolean; // set to true to force homogeneous scaling
    quality?: View$QualityLevel;
}

export enum View$BloomOptions$BlendMode {
    ADD,
    INTERPOLATE,
}

export interface View$BloomOptions {
    // JavaScript binding for dirt is not yet supported, must use default value.
    // JavaScript binding for dirtStrength is not yet supported, must use default value.
    strength?: number; // bloom's strength between 0.0 and 1.0
    resolution?: number; // resolution of vertical axis (2^levels to 2048)
    anamorphism?: number; // bloom x/y aspect-ratio (1/32 to 32)
    levels?: number; // number of blur levels (3 to 11)
    blendMode?: View$BloomOptions$BlendMode; // how the bloom effect is applied
    threshold?: boolean; // whether to threshold the source
    enabled?: boolean; // enable or disable bloom
    highlight?: number; // limit highlights to this value before bloom [10, +inf]
    lensFlare?: boolean; // enable screen-space lens flare
    starburst?: boolean; // enable starburst effect on lens flare
    chromaticAberration?: number; // amount of chromatic aberration
    ghostCount?: number; // number of flare "ghosts"
    ghostSpacing?: number; // spacing of the ghost in screen units [0, 1[
    ghostThreshold?: number; // hdr threshold for the ghosts
    haloThickness?: number; // thickness of halo in vertical screen units, 0 to disable
    haloRadius?: number; // radius of halo in vertical screen units [0, 0.5]
    haloThreshold?: number; // hdr threshold for the halo
}

export interface View$FogOptions {
    distance?: number; // distance in world units from the camera where the fog starts ( >= 0.0 )
    maximumOpacity?: number; // fog's maximum opacity between 0 and 1
    height?: number; // fog's floor in world units
    heightFalloff?: number; // how fast fog dissipates with altitude
    color?: float3; // fog's color (linear), see fogColorFromIbl
    density?: number; // fog's density at altitude given by 'height'
    inScatteringStart?: number; // distance in world units from the camera where in-scattering starts
    inScatteringSize?: number; // size of in-scattering (>0 to activate). Good values are >> 1 (e.g. ~10 - 100).
    fogColorFromIbl?: boolean; // Fog color will be modulated by the IBL color in the view direction.
    enabled?: boolean; // enable or disable fog
}

export enum View$DepthOfFieldOptions$Filter {
    NONE,
    UNUSED,
    MEDIAN,
}

export interface View$DepthOfFieldOptions {
    cocScale?: number; // circle of confusion scale factor (amount of blur)
    maxApertureDiameter?: number; // maximum aperture diameter in meters (zero to disable rotation)
    enabled?: boolean; // enable or disable depth of field effect
    filter?: View$DepthOfFieldOptions$Filter; // filter to use for filling gaps in the kernel
    nativeResolution?: boolean; // perform DoF processing at native resolution
    foregroundRingCount?: number; // number of kernel rings for foreground tiles
    backgroundRingCount?: number; // number of kernel rings for background tiles
    fastGatherRingCount?: number; // number of kernel rings for fast tiles
    maxForegroundCOC?: number;
    maxBackgroundCOC?: number;
}

export interface View$VignetteOptions {
    midPoint?: number; // high values restrict the vignette closer to the corners, between 0 and 1
    roundness?: number; // controls the shape of the vignette, from a rounded rectangle (0.0), to an oval (0.5), to a circle (1.0)
    feather?: number; // softening amount of the vignette effect, between 0 and 1
    color?: float4; // color of the vignette effect, alpha is currently ignored
    enabled?: boolean; // enables or disables the vignette effect
}

export interface View$RenderQuality {
    hdrColorBuffer?: View$QualityLevel;
}

export interface View$AmbientOcclusionOptions$Ssct {
    lightConeRad?: number; // full cone angle in radian, between 0 and pi/2
    shadowDistance?: number; // how far shadows can be cast
    contactDistanceMax?: number; // max distance for contact
    intensity?: number; // intensity
    lightDirection?: float3; // light direction
    depthBias?: number; // depth bias in world units (mitigate self shadowing)
    depthSlopeBias?: number; // depth slope bias (mitigate self shadowing)
    sampleCount?: number; // tracing sample count, between 1 and 255
    rayCount?: number; // # of rays to trace, between 1 and 255
    enabled?: boolean; // enables or disables SSCT
}

export interface View$AmbientOcclusionOptions {
    radius?: number; // Ambient Occlusion radius in meters, between 0 and ~10.
    power?: number; // Controls ambient occlusion's contrast. Must be positive.
    bias?: number; // Self-occlusion bias in meters. Use to avoid self-occlusion. Between 0 and a few mm.
    resolution?: number; // How each dimension of the AO buffer is scaled. Must be either 0.5 or 1.0.
    intensity?: number; // Strength of the Ambient Occlusion effect.
    bilateralThreshold?: number; // depth distance that constitute an edge for filtering
    quality?: View$QualityLevel; // affects # of samples used for AO.
    lowPassFilter?: View$QualityLevel; // affects AO smoothness
    upsampling?: View$QualityLevel; // affects AO buffer upsampling quality
    enabled?: boolean; // enables or disables screen-space ambient occlusion
    bentNormals?: boolean; // enables bent normals computation from AO, and specular AO
    minHorizonAngleRad?: number; // min angle in radian to consider
    // JavaScript binding for ssct is not yet supported, must use default value.
}

export interface View$MultiSampleAntiAliasingOptions {
    enabled?: boolean; // enables or disables msaa
    sampleCount?: number;
    customResolve?: boolean;
}

export interface View$TemporalAntiAliasingOptions {
    filterWidth?: number; // reconstruction filter width typically between 0 (sharper, aliased) and 1 (smoother)
    feedback?: number; // history feedback, between 0 (maximum temporal AA) and 1 (no temporal AA).
    enabled?: boolean; // enables or disables temporal anti-aliasing
}

export interface View$ScreenSpaceReflectionsOptions {
    thickness?: number; // ray thickness, in world units
    bias?: number; // bias, in world units, to prevent self-intersections
    maxDistance?: number; // maximum distance, in world units, to raycast
    stride?: number; // stride, in texels, for samples along the ray.
    enabled?: boolean;
}

export interface View$GuardBandOptions {
    enabled?: boolean;
}

export enum View$AntiAliasing {
    NONE,
    FXAA,
}

export enum View$Dithering {
    NONE,
    TEMPORAL,
}

export enum View$ShadowType {
    PCF,
    VSM,
    DPCF,
    PCSS,
}

export interface View$VsmShadowOptions {
    anisotropy?: number;
    mipmapping?: boolean;
    minVarianceScale?: number;
    lightBleedReduction?: number;
}

export interface View$SoftShadowOptions {
    penumbraScale?: number;
    penumbraRatioScale?: number;
}
