# Naming Things

## The only thing harder than cache invalidation

I found a [list of words][name-list] compiled by Brian Frank, one of the creators of [the Fantom language][fantom], that can used to help pick names for classes and other concepts in code.

I've tried to divide the list into sections of related meaning. This page can serve as a programmer's thesaurus.

### By Purpose

#### Coordination/Discovery

  * Directory
  * Registry
  * Locator
  * Compass
  * Path[way]

#### Storage

  * Cache
  * Bank
  * Repository
  * Depot (write-mainly)

#### Indirection

  * Alias, Moniker
  * Cursor
  * Accessor
  * Shadow

#### Generalization

  * Blueprint, Sketch, Mold
  * Template, Archetype, Prototype
  * Canonical

#### Validation / Confirmation

  * Verifier
  * Checker
  * Validator

#### Messaging

  * Mailbox, Pigeonhole
  * Parcel, Packet, Package, Vessel

#### Connection

  * Mediator
  * Exchange
  * Door
  * Gate
  * Gate[way]
  * Portal
  * Link
  * Conduit

#### Translation Between APIs or Systems

  * Adapter
  * Bridge
  * Wrapper

#### Classification

  * Classifier
  * Species, Kind
  * Variant(in ref to another kind)
  * Dimension, Axis

#### Measurement

  * Denomination
  * Dimension, Axis
  * Quantity, Volume

#### More than an object

  * Entity
  * Identifiable

#### Cleanup

  * Housekeeping, Cleanup

#### Derivation

  * Clone, Morph
  * Dialect

#### Refinement

  * Digest, Summary

#### Creation

  * Factory
  * Builder
  * Mint
  * Manufacturer

#### Subdivision

  * Part, Term, Segment
  * Fragment, Shard
  * Slice
  * Facet

#### Composition

  * Component, Widget, Material, Element
  * Composite, Aggregate

#### Centralization of Control

  * Primary
  * Master
  * Manipulator
  * Director, Dispatcher(esp. for tasks)
  * Authority
  * Manager
  * Authority(the Master of something)

#### Realization

  * Host
  * Facade
  * Facilitator

#### Interface

  * Terminal, Console

#### Grouping

  * Catalog, Entry
  * Kit, Pod, Paracel, Bundle, Assembly, Capsule, Cabinet
  * Block
  * Hive, Cluster
  * Zone, Domain, Realm, Sector
  * Boundary, Extent
  * Tub, Vat (for junk)

#### Annotation

  * Attribute
  * Stamp
  * Aspect
  * Tag, Annotation
  * Meta
  * Descriptor
  * Constraint

#### Augmentation

  * Decorator
  * Extension

#### Planning

  * Plan
  * Transaction
  * Syllabus
  * Timeline
  * Preview

#### Recording

  * Log
  * Record
  * Sentry, Tracker, track
  * Synopsis
  * Transcript, Narrative
  * Timeline
  * History
  * Rendition
  * Heartbeat, Beat - regular interval

#### State Persistence

  * Memento
  * State
  * Session
  * Token(esp. for crypto)

#### Consequence

  * Artifact, Result, Product(esp. with Producer/Consumer)
  * Future, Promise (deferred result)
  * Reduction(with Reducer/.reduce)
  * Response(with Responder/.respond)

#### Behavior

  * Strategy, Tactic(part of a strategy)
  * Scheme
  * Solver
  * Actor
  * Resolver, Lookup
  * Filter, Sieve, Selector(?)
  * Policy
  * Sanitizer
  * Qualifier, Clarifier
  * Cipher
  * Converter, Transformer, Selector(?)
  * Reaction, (Trigger = Qualifier + Strategy)
  * Consumer, Observer
  * Collector
  * Reducer, Coalesce
  * Supplier, Provider
  * Catalyst, Starter, Instigator, Originator
  * Routine, Worker
  * Agent, Task
  * Responder(like Handler)
  * Target, Subject - very generic words for Argument
  * Optimizer
  * Splitter, Blade

#### Logic

  * Interpreter, Engine
  * Rule

#### DataFlow

  * Plug
  * Router
  * Wire, Pipe
  * Receptacle, PlugPoint

#### Error Handling

  * Trapper
  * Medic

#### Authorization

  * Role
  * Permission

#### UI

  * Resource, Asset, Media
  * Dock

#### Data Structures

  * Bag
  * Vector
  * Group
  * Tree
  * Traversal

#### Hierarchical-structured

  * Root
  * Branch
  * Node
  * Attach

#### Graph-structured

  * Dependent
  * Node
  * Attach
  * Relation
  * Colloborators

#### Grid-structured

  * Cell

#### Layered

  * Level
  * Layer
  * Subsystem

#### Substitution

  * Surrogate
  * Clone
  * Proxy

#### Uselessness

  * Zombie - running, but shouldn't be
  * Dead - no longer running

### By Metaphor

#### Money

  * Bank
  * Mint
  * Wallet
  * Purse
  * Broker
  * Denomination
  * Withdrawl/Deposit

#### Paper

  * Page
  * Book
  * Library
  * Catalog
  * Cabinet, File, Folder

#### Social Structure

  * Family
  * Parent
  * Child
  * Tribe

#### Plant

  * Root
  * Branch
  * Leaf
  * Stem

#### Animal

  * Behavior
  * Stimulus
  * Organ
  * Hive
  * Species

#### Diplomacy

  * Ambassador
  * Envoy
  * Liaison

#### Theatre/Music

  * Show(particular sequence of events)
  * Feature(foremost element of a Show)
  * Actor
  * Stage
  * Director
  * Script
  * Cue
  * Verse
  * Stanza
  * Beat

#### Social Services

  * Guardian
  * Caretaker
  * Orphan
  * Ward

#### Electricity

  * Socket
  * Wire
  * Series/Parallel
  * Backplane (set of things in parallel)

### Paired Terms

  * Client/Server
  * Source/Sink
  * Sender/Receiver
  * Reader/Writer
  * Encoder/Decoder
  * Encrypt[er]/Decrypt[er]
  * Marshall/Unmarshall
  * Inflate[r]/Deflate[r]
  * Publish[er]/Subscribe[r]
  * Request[or]/Respon(se|der)

### Bad Ideas

#### Greek Alphabet (Alpha, Beta, Gamma, ...)

I don't think these are a great idea because they imply a fixed number of something or a fixed structure. Having a fixed number is a violation of the [0/1/N Rule][01n-rule] and having fixed structure [precludes general composition][scale-arch].

#### Naming things after the pattern

Flyweight, Decorator, Visitor, Factory, DAO - may be a good idea so people are more likely to know what they are. may be a bad idea if you have two related things named with that pattern e.g. ___VisitorVisitor.

#### Generic Words

Field, Property, Function - avoid terms already used in language

Helper

Handler

Config

Context

____Base

I____

____-let

Info

Map - already overloaded for hashtables and map::a->b->fa->fb

Abstraction

Utils - instead of creating a single Utils class, create mutliple classes named after what they do.

Res (latin obj) - basically means "Thing"

Thing[y|ie] - I will end you; You will be righteously decapitated by the nearest sane person; DO NOT DO IT!

[name-list]: //www.fantom.org/forum/topic/1489
[fantom]: //www.fantom.org/
[01n-rule]: //c2.com/cgi/wiki?ZeroOneInfinityRule
[scale-arch]: //www.haskellforall.com/2014/04/scalable-program-architectures.html
