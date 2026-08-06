# CyberWorld-OSAR V1 — AuthorityAction

## Purpose

AuthorityAction defines the permitted operational actions associated with an AuthorityRef within CyberWorld-OSAR.

AuthorityAction establishes the action vocabulary that an authority relationship may perform against an operational state.

AuthorityAction answers:

> What actions may this authority perform?

AuthorityAction is an action reference mechanism.

AuthorityAction does not create:

- authority
- ownership
- identity
- jurisdiction expansion
- permanent control
- unrestricted operational capability

AuthorityAction operates only within the authority relationship already defined by AuthorityRef.

---

# AuthorityAction Doctrine

An action is not authority itself.

AuthorityAction represents a permitted operation.

The authority relationship comes first.

The action comes second.

Flow:

AuthorityRef  
↓  
AuthorityAction  
↓  
Operational State Movement

AuthorityAction cannot exist independently of a declared authority relationship.

---

# AuthorityAction Structure

## actionReference

Identifies the declared action.

Responsibilities:

- identify requested operation
- preserve action lineage
- support validation
- support audit review

---

## actionType

Defines the category of operation.

Examples:

- DECLARE
- REVIEW
- RELEASE
- AUDIT
- APPEAL

ActionType describes the operation.

It does not grant additional authority.

---

## authorityReference

Links the action to the AuthorityRef that permits the action.

Responsibilities:

- maintain authority relationship
- prevent anonymous action
- preserve authority boundaries

---

## scopeReference

Defines the operational boundary where the action applies.

Scope limits:

- affected object
- affected lane
- operational context
- permitted range

AuthorityAction cannot exceed declared scope.

---

## rulesetReference

Defines the governing rules applied to the action.

Responsibilities:

- action validation
- rule lookup
- enforcement reference

RulesetReference does not create new authority.

---

# AuthorityAction Relationship

CyberWorld-OSAR separates:

State  
+  
Authority  
+  
Evidence  
+  
Scope  
+  
Time

AuthorityAction represents:

Action

AuthorityAction does not represent:

- State
- Evidence
- Ownership
- Identity
- Time

Each remains independently controlled.

---

# AuthorityAction Boundary Rules

## No Authority Creation

AuthorityAction cannot create authority.

It only expresses an allowed operation from an existing AuthorityRef.

---

## No Ownership Change

AuthorityAction cannot transfer ownership.

The attached world object remains with its original holder.

---

## No Identity Mutation

AuthorityAction cannot convert operational conditions into identity.

---

## No Scope Expansion

AuthorityAction cannot exceed:

- AuthorityRef jurisdiction
- declared scope
- governing ruleset

---

## No Lifecycle Override

AuthorityAction cannot bypass:

- OSARAnchorLifecycle
- Clock Law
- validation requirements

---

# AuthorityAction Validation

AuthorityAction validation requires:

- valid AuthorityRef
- defined action type
- valid scope reference
- valid ruleset reference
- permitted action relationship

Invalid AuthorityAction cannot produce valid operational movement.

---

# AuthorityAction Role In OSAR Flow

Flow:

AuthorityRef  
↓  
AuthorityAction  
↓  
OSARRecord  
↓  
CyberWorldState  
↓  
OSARAnchor  
↓  
OSARAnchorRegistry  
↓  
NetSurfacePacket

AuthorityAction provides controlled movement vocabulary.

---

# Completion Criteria

AuthorityAction is complete when:

- action vocabulary is defined
- authority relationship is linked
- scope boundaries are defined
- validation requirements are defined

AuthorityAction becomes the second Layer-0 foundation artifact.

---

# Final Principle

AuthorityRef identifies who may declare a condition.

AuthorityAction identifies what declared operation may occur.

Neither creates ownership.

Neither creates identity.

Together they establish a bounded authority relationship for CyberWorld-OSAR.

